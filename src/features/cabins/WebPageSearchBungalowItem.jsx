import { useState } from 'react';
import styled, { css } from 'styled-components';
import Spinner from '../../ui/Spinner';
import {
  calculateDailyPrice,
  calculateTotalPrice,
  formatCurrency,
  isUserRangeOverlapping,
} from '../../utils/helpers';
import Checkbox from '../../ui/Checkbox';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setBookingDetails } from '../bookings/newBookingSlice';
import { device } from '../../styles/bereakingPoints';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { getUserTimeZone, userPickToHotelUtcMidnight } from '../../utils/time';
import { useCabinOccupaidDaysForGuests } from '../bookings/useCabinOccupaidDaysForGuests';

const StyledWebPageSearchBungalowItem = styled.li`
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-surface);
  display: grid;
  grid-template-columns: 20rem repeat(4, 1fr);
  gap: 6rem;
  align-items: center;
  padding-right: 5rem;

  @media ${device.tabletS} {
    grid-template-columns: 20rem repeat(3, 1fr);
    gap: 4rem;
  }

  @media ${device.mobileL} {
    grid-template-columns: 15rem repeat(2, 1fr);
    gap: 2rem;
  }

  box-shadow: var(--shadow-md);

  transition: all 0.2s ease-out;

  @media ${device.tabletL} {
    font-size: 1.4rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-5px);
    }
  }

  ${(props) => {
    const positionx = 100 + Number(props.$xposition) * 50;
    return css`
      &.bungalowitem-enter {
        opacity: 0;
        transform: translateX(${positionx}px);
      }

      &.bungalowitem-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition:
          opacity 0.5s ease,
          transform 0.5s ease;
      }

      &.bungalowitem-exit {
        opacity: 1;
        transform: translateX(0);
      }

      &.bungalowitem-exit-active {
        opacity: 0;
        transform: translateX(${positionx}px);
        transition:
          opacity 0.5s ease,
          transform 0.5s ease;
      }
    `;
  }}
`;

const ImgContainer = styled.div`
  position: relative;
`;

const ImgButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  border-top-left-radius: var(--border-radius-sm);
  border-bottom-left-radius: var(--border-radius-sm);
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  border: none;
  opacity: 0;
  visibility: hidden;

  color: var(--color-grey-50);
  font-weight: 600;

  transition: all 0.2s ease-out;

  ${StyledWebPageSearchBungalowItem}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 100%;
  border-top-left-radius: var(--border-radius-sm);
  border-bottom-left-radius: var(--border-radius-sm);
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  color: var(--color-brand-600);

  & .lineInfo {
    margin-left: 1rem;
    font-size: 1.2rem;
    font-style: italic;

    @media ${device.mobileL} {
      display: block;
    }
  }
`;

const TextLabel = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

const PriceText = styled.span`
  font-family: 'Sono';

  .invalid {
    font-size: 1.2rem;
    font-style: italic;
    text-decoration: line-through;
    color: red;
  }
`;

const Warning = styled.span`
  font-style: italic;
  color: red;
`;

function WebPageSearchBungalowItem({
  cabin,
  index,
  setting,
  pickedStart,
  pickedEnd,
  numGuests,
  dayCount,
  ref,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { cabinOccupaidDays, isLoading: isCabinOccupaidDaysLoading } =
    useCabinOccupaidDaysForGuests(cabin?._id);
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  const dailyPrice = calculateDailyPrice(cabin);

  const paramsSubmitted = pickedStart || pickedEnd || numGuests;

  const anyOverLappingDays =
    cabinOccupaidDays && pickedStart && pickedEnd
      ? isUserRangeOverlapping(
          pickedStart,
          pickedEnd,
          getUserTimeZone(),
          process.env.TZ,
          cabinOccupaidDays,
        )
      : false;

  const isNumGuestsBelowMaxGuest = numGuests <= cabin.maxCapacity;

  const isBookingPossible = Boolean(
    paramsSubmitted && !anyOverLappingDays && isNumGuestsBelowMaxGuest,
  );

  const totalPrice = calculateTotalPrice(
    dayCount,
    numGuests,
    dailyPrice,
    setting?.breakfastPrice,
    hasBreakfast,
  );

  function handleClickItem() {
    if (isBookingPossible) {
      dispatch(
        setBookingDetails({
          startDateUtc: userPickToHotelUtcMidnight(
            new Date(pickedStart),
            getUserTimeZone(),
            process.env.TZ,
          ).toISOString(),
          numNights: dayCount,
          hasBreakfast,
          numGuests,
        }),
      );
      navigate(`/web/bungalows/${cabin._id}`);
    }
  }

  return (
    <StyledWebPageSearchBungalowItem ref={ref} $xposition={index}>
      <>
        {!isImgLoaded && <Spinner />}
        <ImgContainer style={{ display: isImgLoaded ? 'block' : 'none' }}>
          {isBookingPossible && (
            <ImgButton type="button" onClick={handleClickItem}>
              Click For Booking
            </ImgButton>
          )}
          <Img
            src={process.env.APP_URL + 'data' + cabin?.image}
            alt={cabin?.name}
            onLoad={() => setIsImgLoaded(true)}
            style={{ display: isImgLoaded ? 'block' : 'none' }}
          />
        </ImgContainer>
      </>
      <TextBox>
        <TextLabel>Cabin Name:</TextLabel>
        <span>{cabin?.name}</span>
      </TextBox>
      {!isTabletSorSmaller && (
        <TextBox>
          <TextLabel>Daily Price</TextLabel>
          <PriceText>
            {cabin?.discount ? (
              <>
                <span>{formatCurrency(dailyPrice)}</span>{' '}
                <span className="invalid">
                  {formatCurrency(cabin?.regularPrice)}
                </span>
              </>
            ) : (
              <span>{formatCurrency(dailyPrice)}</span>
            )}
          </PriceText>
        </TextBox>
      )}
      {!isMobileLorSmaller && (
        <TextBox>
          <TextLabel>Include Breakfast?</TextLabel>
          <Checkbox
            value={hasBreakfast}
            id="hasBreakfast"
            onChange={() => setHasBreakfast((hasBreakfast) => !hasBreakfast)}
            type="priceLabel"
            disabled={!isBookingPossible}
          >
            {formatCurrency(setting?.breakfastPrice)}
          </Checkbox>
        </TextBox>
      )}
      <TextBox>
        {isCabinOccupaidDaysLoading && <Spinner />}
        {!paramsSubmitted ? (
          <Warning>Please submit dates and number of guests.</Warning>
        ) : null}
        {paramsSubmitted && anyOverLappingDays ? (
          <Warning>{cabin.name} is not avaliable selected days.</Warning>
        ) : null}
        {paramsSubmitted && !anyOverLappingDays && !isNumGuestsBelowMaxGuest ? (
          <Warning>
            Maximum capacity of {cabin?.name} is {cabin?.maxCapacity}.
          </Warning>
        ) : null}
        {paramsSubmitted &&
        !anyOverLappingDays &&
        isNumGuestsBelowMaxGuest &&
        totalPrice ? (
          <>
            <TextLabel>Total Price:</TextLabel>
            <div>
              <PriceText>{formatCurrency(totalPrice)}</PriceText>
              <span className="lineInfo">(for {dayCount} days)</span>
            </div>
          </>
        ) : null}
      </TextBox>
    </StyledWebPageSearchBungalowItem>
  );
}

export default WebPageSearchBungalowItem;
