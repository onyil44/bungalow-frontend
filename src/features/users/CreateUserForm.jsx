import jsValidator from 'validator';

import { useForm } from 'react-hook-form';

import { useCurrentUser } from '../authentication/useCurrentUser';

import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import Form from '../../ui/Form';
import Select from '../../ui/Select';
import Spinner from '../../ui/Spinner';
import FormButtonRow from '../../ui/FormButtonRow';
import Button from '../../ui/Button';
import FormCheckBox from '../../ui/FormCheckBox';
import { useUpdateUser } from './useUpdateUser';
import { useCreateUser } from './useCreateUser';
import Heading from '../../ui/Heading';
import { useResetUserPassword } from './useResetUserPassword';
import { useDeleteUser } from './useDeleteUser';

function CreateUserForm({ userToUpdate = {}, onCloseModal }) {
  const isEditingSession = Boolean(userToUpdate._id);
  const { user: currentUser, isCurrentUserLoading } = useCurrentUser();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: userToUpdate,
  });

  const { updateUser, isUpdating } = useUpdateUser();

  const { createUser, isCreating } = useCreateUser();

  const { resetUserPassword, isUserPasswordResetting } = useResetUserPassword();

  const { deleteUser, isUserDeleting } = useDeleteUser();

  const isLoading =
    isCreating || isUpdating || isUserPasswordResetting || isUserDeleting;

  const roleUpdateRoles = ['admin', 'superAdmin'];

  if (isCurrentUserLoading) return <Spinner />;

  const { errors } = formState;

  function onSubmit(data) {
    if (isEditingSession) {
      updateUser(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      createUser(data, {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      });
    }
  }

  function handleResetPassword() {
    resetUserPassword(userToUpdate._id, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  function handleDelete() {
    deleteUser(userToUpdate._id, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <>
      <div>
        <Heading as="h2" $variation="modal" style={{ display: 'inline-block' }}>
          {isEditingSession ? 'Update' : 'Create'} User
        </Heading>
        {isEditingSession && (
          <div>
            <Heading
              as="h4"
              $variation="modal"
              style={{ display: 'inline-block' }}
            >
              User Name :
            </Heading>
            <span style={{ fontSize: '1.7rem' }}> {userToUpdate.fullName}</span>{' '}
            <span style={{ fontSize: '1.7rem' }}>({userToUpdate.email})</span>
          </div>
        )}
      </div>
      <Form
        type={onCloseModal ? 'modal' : 'regular'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="hidden" id="_id" {...register('_id')} />
        <FormRow label="User Name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isLoading}
            {...register('fullName', { required: 'This field is required' })}
          />
        </FormRow>

        {!isEditingSession && (
          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              disabled={isLoading}
              {...register('email', {
                required: 'This field is required',
                validate: (val) =>
                  jsValidator.isEmail(val) ||
                  'Please submit a valid email address.',
              })}
            />
          </FormRow>
        )}

        {isEditingSession && (
          <>
            <FormRow label="Role" error={errors?.role?.message}>
              <Select
                id="role"
                options={
                  currentUser.role === 'superAdmin'
                    ? [
                        { value: 'receptionist', label: 'Receptionist' },
                        { value: 'manager', label: 'Manager' },
                        { value: 'admin', label: 'Admin' },
                        { value: 'superAdmin', label: 'Super Admin' },
                      ]
                    : [
                        { value: 'receptionist', label: 'Receptionist' },
                        { value: 'manager', label: 'Manager' },
                        { value: 'admin', label: 'Admin' },
                      ]
                }
                disabled={
                  !roleUpdateRoles.includes(currentUser.role) || isLoading
                }
                {...register('role')}
              />
            </FormRow>
            <FormRow label="User Active?" error={errors?.isActive?.message}>
              <FormCheckBox
                id="isActive"
                {...register('isActive')}
                disabled={isLoading}
              />
            </FormRow>
          </>
        )}
        <FormButtonRow>
          {isEditingSession && (
            <Button
              type="button"
              $variation="blue"
              $size="medium"
              onTap={handleResetPassword}
            >
              Reset Password
            </Button>
          )}
          <Button $variation="primary" $size="medium" disabled={isLoading}>
            {isEditingSession ? 'Update' : 'Create'} User
          </Button>
          {isEditingSession && (
            <Button
              type="button"
              $variation="danger"
              $size="medium"
              onTap={handleDelete}
            >
              Delete
            </Button>
          )}
          <Button
            type="button"
            $variation="seondary"
            $size="medium"
            onTap={() => onCloseModal()}
          >
            Cancel
          </Button>
        </FormButtonRow>
      </Form>
    </>
  );
}

export default CreateUserForm;
