import BookingSearchOperations from '../features/bookings/BookingSearchOperations';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { device } from '../styles/bereakingPoints';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Bookings() {
  const isMobileLorSmaller = useMediaQuery(device.mobileL);
  return (
    <>
      <Row type={isMobileLorSmaller ? 'vertical' : 'horizontal'}>
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="horizontal">
        <BookingSearchOperations />
      </Row>
      <Row type="vertical">
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
