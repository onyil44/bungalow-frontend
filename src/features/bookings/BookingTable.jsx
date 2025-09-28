import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';

function BookingTable() {
  const { bookings, count, isLoading } = useBookings();
  const isTabletorSmaller = useMediaQuery(device.tablet);
  const isMobileLorSmaller = useMediaQuery(device.mobileL);

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="bookings" />;

  let tableColumns = '0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem';

  if (isTabletorSmaller) tableColumns = '0.6fr 2fr 2.4fr 1.4fr 1fr';
  if (isMobileLorSmaller) tableColumns = '0.6fr 2fr 2.4fr 1fr';

  return (
    <Menus>
      <Table columns={tableColumns}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          {isMobileLorSmaller ? null : <div>Status</div>}
          {isTabletorSmaller ? null : <div>Amount</div>}
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
