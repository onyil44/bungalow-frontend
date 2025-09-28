import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo.jsx';
import Heading from '../ui/Heading.jsx';
import LoginLayout from '../ui/LoginLayout.jsx';
import { useNavigate } from 'react-router';
import ButtonText from '../ui/ButtonText.jsx';
import AutoLogin from '../features/authentication/AutoLogin.jsx';

function Login() {
  const navigate = useNavigate();

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2" $variation="login">
        Login to your account
      </Heading>
      <LoginForm />

      <AutoLogin />
      <ButtonText onTap={() => navigate('/web')}>&larr; To Web Page</ButtonText>
    </LoginLayout>
  );
}

export default Login;
