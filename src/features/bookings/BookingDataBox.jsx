import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';
import { device } from '../../styles/bereakingPoints';

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  @media ${device.tabletS} {
    font-size: 1.4rem;

    svg {
      height: 2.4rem;
      width: 2.4rem;
    }
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderCabinName = styled.span`
  font-family: 'Sono';
  font-size: 2rem;
  margin-left: 4px;

  @media ${device.tabletS} {
    font-size: 1.8rem;
  }
`;

const HeaderTimeBox = styled.p`
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media ${device.mobileL} {
    flex-direction: row;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  color: ${(props) =>
    props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }

  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    createdAt,
    startYmd_user,
    endYmd_user,
    numNights,
    numGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guestId: { fullName, email, country, countryFlag, nationalId },
    cabinId: { name: cabinName },
  } = booking;

  const isTabletorSmaller = useMediaQuery(device.tablet);
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in <HeaderCabinName>{cabinName}</HeaderCabinName>
          </p>
        </div>

        <HeaderTimeBox>
          <span>
            {format(new Date(startYmd_user), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(startYmd_user))
              ? 'Today'
              : formatDistanceFromNow(startYmd_user)}
            )
          </span>
          {isTabletorSmaller && !isMobileLorSmaller ? null : (
            <span>&mdash;</span>
          )}
          <span>{format(new Date(endYmd_user), 'EEE, MMM dd yyyy')}</span>
        </HeaderTimeBox>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {fullName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          {isMobileLorSmaller ? null : <span>&bull;</span>}
          <p>{email}</p>
          {isMobileLorSmaller ? null : <span>&bull;</span>}
          <p>National ID {nationalId}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extraPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
