import jsValidator from 'validator';

import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FormButtonRow from '../../ui/FormButtonRow';
import { useUpdatePassword } from './useUpdatePassword';

function UpdatePasswordForm() {
  const { updatePassword, isUpdating } = useUpdatePassword();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    updatePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Current Password" error={errors?.password?.message}>
        <Input
          type="password"
          autoComplete="current-password"
          id="password"
          disabled={false}
          {...register('password', {
            required: 'This field is required',
            validate: {
              validatePassword: function (val) {
                return (
                  jsValidator.isStrongPassword(val, {
                    minLength: 9,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    returnScore: false,
                    pointsPerUnique: 1,
                    pointsPerRepeat: 0.5,
                    pointsForContainingLower: 10,
                    pointsForContainingUpper: 10,
                    pointsForContainingNumber: 10,
                    pointsForContainingSymbol: 10,
                  }) || 'This password does not meet required criteria.'
                );
              },
            },
          })}
        />
      </FormRow>

      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="newPassword"
          disabled={false}
          {...register('newPassword', {
            required: 'This field is required',
            validate: {
              validatePassword: function (val) {
                return (
                  jsValidator.isStrongPassword(val, {
                    minLength: 9,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    returnScore: false,
                    pointsPerUnique: 1,
                    pointsPerRepeat: 0.5,
                    pointsForContainingLower: 10,
                    pointsForContainingUpper: 10,
                    pointsForContainingNumber: 10,
                    pointsForContainingSymbol: 10,
                  }) || 'This password does not meet required criteria.'
                );
              },
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm New Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="newPasswordConfirm"
          disabled={false}
          {...register('newPasswordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().newPassword === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormButtonRow $position="center">
        <Button
          onTap={reset}
          disabled={isUpdating}
          type="reset"
          $variation="secondary"
          $size="medium"
        >
          Cancel
        </Button>
        <Button $variation="primary" disabled={isUpdating} $size="medium">
          Update password
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default UpdatePasswordForm;
