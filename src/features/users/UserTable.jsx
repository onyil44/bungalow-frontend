import { useMediaQuery } from '../../hooks/useMediaQuery';
import { device } from '../../styles/bereakingPoints';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import UserRow from './UserRow';
import { useUsers } from './useUsers';

function UserTable() {
  const { users, count, isLoading } = useUsers();
  const isMobieLorSmaller = useMediaQuery(device.mobileL);

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="users" />;

  let tableColumns = '2fr 2fr 1.5fr 1fr 3.2rem';
  if (isMobieLorSmaller) tableColumns = '2fr 2fr 1fr 3.2rem';
  return (
    <Menus>
      <Table columns={tableColumns}>
        <Table.Header>
          <div>Name</div>
          <div>Email</div>
          {isMobieLorSmaller ? null : <div>Role</div>}
          <div>Status</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow key={user._id} user={user} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
