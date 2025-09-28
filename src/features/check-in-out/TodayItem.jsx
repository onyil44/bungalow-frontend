import styled from 'styled-components';

import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 9rem 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const navigate = useNavigate();

  const {
    _id: bookingId,
    status,
    numNights,
    guestId: { fullName },
  } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Guest>{fullName}</Guest>
      <div>{numNights} Nights</div>
      <Button
        $variation="primary"
        $size="small"
        type="button"
        onTap={() => navigate(`/admin/bookings/${bookingId}`)}
      >
        Details
      </Button>
    </StyledTodayItem>
  );
}

export default TodayItem;
