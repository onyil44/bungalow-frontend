import SettingsTable from '../features/settings/SettingsTable';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import { useSettings } from '../features/settings/useSettings';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import Modal from '../ui/Modal.jsx';
import {
  HiMiniPencilSquare,
  HiOutlineDocumentPlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useDeleteNotActiveSettings } from '../features/settings/useClearNotActiveSettings.js';
import ConfirmAction from '../ui/ConfirmAction.jsx';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import SettingTableOperations from '../features/settings/SettingTableOperations.jsx';

function Settings() {
  const { isPending, settings } = useSettings();
  const { deleteNotActiveSettings, isDeleting } = useDeleteNotActiveSettings();
  const closeModalRef = useRef();

  function handleDeleteNotActiveSettings(e) {
    e.preventDefault();
    if (!settings?.some((setting) => setting.isActive === false)) {
      closeModalRef.current?.close();
      return toast.error('There is no in active settings.');
    }
    deleteNotActiveSettings(null, {
      onSuccess: () => {
        closeModalRef.current?.close();
      },
    });
  }

  const activeSetting = settings?.find((setting) => setting.isActive);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Update hotel settings</Heading>
        <SettingTableOperations />
      </Row>
      <Row type="horizontal">
        <ButtonGroup>
          <Modal ref={closeModalRef}>
            <Modal.Open opens="form-settings">
              <Button type="button" $size="medium" $variation="primary">
                <HiOutlineDocumentPlus />
                <span>Create New Settings</span>
              </Button>
            </Modal.Open>
            <Modal.Window name="form-settings">
              <UpdateSettingsForm />
            </Modal.Window>

            <Modal.Open opens="edit-settings">
              <Button type="button" $size="medium" $variation="blue">
                <HiMiniPencilSquare /> <span>Edit Active Settings</span>
              </Button>
            </Modal.Open>
            <Modal.Window name="edit-settings">
              <UpdateSettingsForm setting={activeSetting} />
            </Modal.Window>

            <Modal.Open opens="clear-settings">
              <Button type="button" $size="medium" $variation="danger">
                <HiOutlineTrash />
                <span>Clear Not Active Settings</span>
              </Button>
            </Modal.Open>
            <Modal.Window name="clear-settings">
              <ConfirmAction
                action="delete"
                resourceName="In Active Settings"
                onConfirm={handleDeleteNotActiveSettings}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </ButtonGroup>
      </Row>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <SettingsTable settings={settings} />
        </>
      )}
    </>
  );
}

export default Settings;
