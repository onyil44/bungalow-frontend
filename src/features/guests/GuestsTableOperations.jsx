import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';
import CreateGuestForm from './CreateGuestForm';

function GuestsTableOperations() {
  return (
    <TableOperations>
      <Modal>
        <Modal.Open opens="create-guest">
          <Button $variation="primary" $size="mediumSmall">
            Create New Guest
          </Button>
        </Modal.Open>
        <Modal.Window name="create-guest">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
      <SortBy
        options={[
          { value: 'fullName', label: 'Sort by name (A-Z)' },
          { value: '-fullName', label: 'Sort by name (Z-A)' },
          {
            value: 'nationality',
            label: 'Sort by nationality (A-Z)',
          },
          { value: '-nationality', label: 'Sort by nationality (Z-A)' },
          {
            value: 'nationalId',
            label: 'Sort by national ID (A-Z)',
          },
          { value: '-nationalId', label: 'Sort by national ID (Z-A)' },
        ]}
      />
    </TableOperations>
  );
}

export default GuestsTableOperations;
