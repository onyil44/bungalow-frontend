import NewBookingSearchOperations from '../features/bookings/NewBookingSearchOperations';
import CabinCardsContainer from '../features/cabins/CabinCardsContainer';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { device } from '../styles/bereakingPoints';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function NewBooking() {
  const isMobileLorSmaller = useMediaQuery(device.mobileL);
  return (
    <>
      <Row type={isMobileLorSmaller ? 'vertical' : 'horizontal'}>
        <Heading as="h1">Create New Booking</Heading>
      </Row>
      <Row type="horizontal">
        <NewBookingSearchOperations />
      </Row>
      <Row type="vertical">
        <CabinCardsContainer />
      </Row>
    </>
  );
}

export default NewBooking;
