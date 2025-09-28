import jsValidator from 'validator';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';

function LoginForm() {
  const { isLoggingIn, login } = useLogin();
  const { register, handleSubmit, formState, reset } = useForm();

  const { errors } = formState;

  function onSubmit(data) {
    login(data, {
      onError: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          {...register('email', {
            required: 'Please submit your email adress',
            validate: {
              emailValidate: function (val) {
                return (
                  jsValidator.isEmail(val) ||
                  'Please submit a valid email address.'
                );
              },
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Please submit password',
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
      <FormRowVertical>
        <Button $size="large" $variation="primary" disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
