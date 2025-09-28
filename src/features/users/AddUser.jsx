import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateUserForm from './CreateUserForm';

function AddUser() {
  return (
    <Modal>
      <Modal.Open opens="create-user">
        <Button $variation="primary" $size="medium" type="button">
          Add User
        </Button>
      </Modal.Open>
      <Modal.Window name="create-user">
        <CreateUserForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddUser;
