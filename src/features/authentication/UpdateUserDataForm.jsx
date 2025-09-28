import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import FormCheckBox from '../../ui/FormCheckBox';
import FormButtonRow from '../../ui/FormButtonRow';
import Input from '../../ui/Input';

import { useCurrentUser } from './useCurrentUser';
import { useForm } from 'react-hook-form';
import { useUpdateMe } from './useUpdateMe';

function UpdateUserDataForm() {
  const { user } = useCurrentUser();

  const { updateMe, isUpdating } = useUpdateMe();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: user,
  });

  const { errors } = formState;

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('darkMode', data.darkMode);
    if (data.avatar instanceof FileList && data.avatar.length > 0)
      formData.append('avatar', data.avatar[0]);

    updateMe(formData);
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input id="email" type="email" disabled value={user.email} />
      </FormRow>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isUpdating}
          {...register('fullName', { required: 'This field is required.' })}
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors?.avatar?.message}>
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          {...register('avatar')}
        />
      </FormRow>
      <FormRow label="Dark mode:">
        <FormCheckBox {...register('darkMode')}>
          If dark mode default?
        </FormCheckBox>
      </FormRow>
      <FormButtonRow $position="center">
        <Button
          type="reset"
          $variation="secondary"
          $size="medium"
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button $variation="primary" $size="medium" disabled={isUpdating}>
          Update Account
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default UpdateUserDataForm;
