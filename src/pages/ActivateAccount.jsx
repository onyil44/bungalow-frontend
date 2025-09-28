import ActivateAccountForm from '../features/authentication/ActivateAccountForm';
import Heading from '../ui/Heading';
import LoginLayout from '../ui/LoginLayout';
import Logo from '../ui/Logo';

function ActivateAccount() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Create a password to activate your account.</Heading>
      <ActivateAccountForm />
    </LoginLayout>
  );
}

export default ActivateAccount;
