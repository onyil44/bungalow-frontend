import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';
import Checkbox from './Checkbox';
import { useRef, useState } from 'react';
import { useSettings } from '../features/settings/useSettings';
import Spinner from './Spinner';
import {
  calculateDailyPrice,
  calculateDayCount,
  calculateTotalPrice,
  formatCurrency,
  isUserRangeOverlapping,
} from '../utils/helpers';
import Button from './Button';
import { useNavigate } from 'react-router';
import { useURL } from '../hooks/useURL';
import { fromUnixTime } from 'date-fns';
import { useCabinOccupaidDays } from '../features/bookings/useCabinOccupaidDays';
import Modal from './Modal';
import CreateNewBokingForm from '../features/bookings/CreateNewBokingForm';
import { getUserTimeZone } from '../utils/time';
import { ENV } from '../../config/env';

const StyledCabinCard = styled.div`
  background-color: var(--color-background);

  border-radius: var(--border-radius-sm);

  position: relative;

  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 2px,
    rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px,
    rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px,
    rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const CardHeader = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderImgContainer = styled.div`
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  border-top-right-radius: var(--border-radius-sm);
  border-top-left-radius: var(--border-radius-sm);
`;

const BungalowName = styled.div`
  position: absolute;
  bottom: 0;

  font-size: 1.6rem;

  padding: 0.5rem 1rem;
  width: 100%;
  font-weight: 600;

  color: var(--color-brand-600);
  background-color: var(--color-background-transparent-7);
`;

const CardBody = styled.div`
  padding: 1.5rem 2.5rem;
  margin-bottom: 6rem;

  @media ${device.laptop} {
    font-size: 1.4rem;
  }
`;

const BookingDetail = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  text-align: center;
`;
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;

  font-family: 'Sono';
  font-style: italic;
`;

const BungalowPrice = styled.span``;

const TotalPrice = styled.span`
  font-weight: 700;
  color: var(--color-brand-600);
  border-top: 1px solid var(--color-brand-600);
  border-bottom: 1px solid var(--color-brand-600);
`;

const NotSuitableBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-red-800);
  font-style: italic;
  gap: 1rem;
  span {
    text-align: center;
  }
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: var(--color-background-muted);
  bottom: 0;
  width: 100%;
  gap: 1rem;
`;

function CabinCard({ bungalow }) {
  const closeModalRef = useRef();
  const navigate = useNavigate();
  const [hasBreakfast, setHasbreakfast] = useState(false);
  const { settings, isPending: isSettingsLoading } = useSettings();
  const { getURLParams } = useURL();
  const {
    cabinOccupaidDays: bungalowOccupaidDays,
    isLoading: isBungalowOccupaidDaysLoading,
  } = useCabinOccupaidDays(bungalow._id);

  const isLoading = isSettingsLoading || isBungalowOccupaidDaysLoading;

  const setting = settings?.find((setting) => setting.isActive);

  const numGuests = Number(getURLParams('numGuests'));

  const isGuestsFitToBungalow = Boolean(bungalow.maxCapacity >= numGuests);

  const startDate = getURLParams('startDate')
    ? fromUnixTime(Number(getURLParams('startDate')))
    : null;

  const endDate = getURLParams('endDate')
    ? fromUnixTime(Number(getURLParams('endDate')))
    : null;

  const anyOverLappingDays =
    bungalowOccupaidDays && startDate && endDate
      ? isUserRangeOverlapping(
          startDate,
          endDate,
          getUserTimeZone(),
          ENV.TZ,
          bungalowOccupaidDays,
        )
      : false;

  const numNights = calculateDayCount(startDate, endDate);

  const dailyPrice = calculateDailyPrice(bungalow);

  const totalPrice = calculateTotalPrice(
    numNights,
    numGuests,
    dailyPrice,
    setting?.breakfastPrice,
    hasBreakfast,
  );

  const isDatesSelected = Boolean(startDate || endDate);

  const isBookingPossible = Boolean(
    isGuestsFitToBungalow && !anyOverLappingDays && isDatesSelected,
  );

  if (isLoading) return <Spinner />;

  return (
    <StyledCabinCard>
      <CardHeader>
        <HeaderImgContainer>
          <Img
            src={ENV.APP_URL + 'data' + bungalow.image}
            alt={bungalow.name}
          />
        </HeaderImgContainer>
        <BungalowName>
          <span>{bungalow.name}</span>
        </BungalowName>
      </CardHeader>
      <CardBody>
        {!isDatesSelected && (
          <NotSuitableBox>
            <span>Please select dates.</span>
          </NotSuitableBox>
        )}
        {!isGuestsFitToBungalow && isDatesSelected && (
          <NotSuitableBox>
            <span>This bungalow is not suitable for seletced criterias.</span>
            <span>Up to {bungalow.maxCapacity} guest(s)</span>
          </NotSuitableBox>
        )}
        {isGuestsFitToBungalow && isDatesSelected && anyOverLappingDays && (
          <NotSuitableBox>
            <span>This bungalow is not suitable for seletced criterias.</span>
            <span>Please change dates.</span>
          </NotSuitableBox>
        )}
        {isGuestsFitToBungalow && isDatesSelected && !anyOverLappingDays && (
          <>
            <Checkbox
              id="hasBreakfast"
              onChange={() => setHasbreakfast((hasBreakfast) => !hasBreakfast)}
            >
              Has breakfast? ({formatCurrency(setting.breakfastPrice)})
            </Checkbox>
            <BookingDetail>
              <span>
                {numNights} night(s) for {numGuests} guest(s)
              </span>
            </BookingDetail>
            <PriceBox>
              <BungalowPrice>
                Dailiy Price: {formatCurrency(dailyPrice)}{' '}
              </BungalowPrice>
              <TotalPrice>Total: {formatCurrency(totalPrice)}</TotalPrice>
            </PriceBox>
          </>
        )}
      </CardBody>
      {isDatesSelected && (
        <CardFooter>
          <Button
            onTap={() => navigate(`/admin/cabins/${bungalow._id}`)}
            $variation="brand-soft"
            $size="mediumSmall"
          >
            Details
          </Button>

          <Modal ref={closeModalRef}>
            <Modal.Open opens="create-new-booking">
              <Button
                $variation="primary"
                $size="mediumSmall"
                disabled={!isBookingPossible}
              >
                Create
              </Button>
            </Modal.Open>
            <Modal.Window name="create-new-booking">
              <CreateNewBokingForm
                bungalow={bungalow}
                bookingData={{
                  cabinId: bungalow._id,
                  pickedStart: startDate,
                  pickedEnd: endDate,
                  numNights: numNights,
                  numGuests: numGuests,
                  hasBreakfast: hasBreakfast,
                }}
              />
            </Modal.Window>
          </Modal>
        </CardFooter>
      )}
    </StyledCabinCard>
  );
}

export default CabinCard;
