import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import GuestRow from './GuestRow';
import { useGuests } from './useGuests';

function GuestsTable() {
  const { guests, count, isLoading } = useGuests();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="repeat(3, minmax(0,1fr)) 3.2rem">
        <Table.Header>
          <div>Guest</div>
          <div>Nationality</div>
          <div>National Id</div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => <GuestRow key={guest._id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTable;
