import styled from 'styled-components';
import Heading from '../../ui/Heading';
import WebPageCreateBookingForm from './WebPageCreateBookingForm';
import { useSelector } from 'react-redux';
import { getTotalPrice } from './newBookingSlice';
import { formatCurrency } from '../../utils/helpers';

const StyledWebPageNewBokingDetail = styled.div`
  max-width: 130rem;
  background-color: var(--color-background-surface);
  border-radius: var(--border-radius-sm);
  padding: 2rem 4rem;
  margin: 0 auto;
`;

const WebPageNewBokingDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2rem;
  margin-right: 3rem;

  font-size: 1.8rem;
  color: var(--color-brand-600);

  & span {
    &:first-child {
      font-weight: 600;
    }

    &:last-child {
      font-family: 'Sono';
      font-weight: 500;
      font-style: italic;
    }
  }
`;

function WebPageNewBokingDetail() {
  const totalPrice = useSelector(getTotalPrice);

  return (
    <StyledWebPageNewBokingDetail>
      <WebPageNewBokingDetailHeader>
        <Heading as="h2">New Booking</Heading>
        <TotalPrice>
          <span>Total Price</span>
          <span>{formatCurrency(Number(totalPrice) || 0)}</span>
        </TotalPrice>
      </WebPageNewBokingDetailHeader>
      <WebPageCreateBookingForm />
    </StyledWebPageNewBokingDetail>
  );
}

export default WebPageNewBokingDetail;
