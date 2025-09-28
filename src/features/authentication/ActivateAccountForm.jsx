import jsValidator from 'validator';

import { useActivateAccount } from './useActivateAccount';
import FormRowVertical from '../../ui/FormRowVertical';
import { useForm } from 'react-hook-form';
import SpinnerMini from '../../ui/SpinnerMini';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Form from '../../ui/Form';

function ActivateAccountForm() {
  const { activateAccount, isActivating } = useActivateAccount();
  const { register, handleSubmit, formState, reset, getValues } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    activateAccount(data, {
      onError: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'Please submit your email adress',
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
      </FormRowVertical>
      <FormRowVertical
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'Please submit password',
            validate: {
              validatePasswordConfirm: function (val) {
                return (
                  getValues().password === val || 'Passwords are not macth.'
                );
              },
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large" $variation="primary" disabled={isActivating}>
          {isActivating ? <SpinnerMini /> : 'Create Password'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default ActivateAccountForm;
