import AddUser from '../features/users/AddUser';
import CreateUserForm from '../features/users/CreateUserForm';
import UserTable from '../features/users/UserTable';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Modal from '../ui/Modal';
import Row from '../ui/Row';

function NewUsers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
      </Row>
      <Row type="vertical">
        <UserTable />
      </Row>
      <Row type="vertical">
        <AddUser />
      </Row>
    </>
  );
}

export default NewUsers;
