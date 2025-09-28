import styled from 'styled-components';
import Button from '../../ui/Button';
import { useReceptionistAutoLogin } from './useReceptionistAutoLogin';
import { useManagerAutoLogin } from './useManagerAutoLogin';

const StyledAutoLogin = styled.div`
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StyledAutoLoginHeader = styled.div`
  grid-column: 1/-1;
  text-align: center;
  font-weight: 600;
  color: var(--color-brand-600);

  padding-bottom: 1rem;

  border-bottom: 1px solid var(--color-brand-600);
`;

function AutoLogin() {
  const { receptionistAutoLogin, isReceptionistAutoLoggin } =
    useReceptionistAutoLogin();

  const { managerAutoLogin, isManagerAutoLoggin } = useManagerAutoLogin();

  const isLogging = isReceptionistAutoLoggin || isManagerAutoLoggin;

  return (
    <StyledAutoLogin>
      <StyledAutoLoginHeader>Demo Login</StyledAutoLoginHeader>

      <Button
        type="button"
        $variation="blue"
        $size="medium"
        disabled={isLogging}
        onTap={receptionistAutoLogin}
      >
        Login as a receptionist
      </Button>

      <Button
        type="button"
        $variation="edit"
        $size="medium"
        disabled={isLogging}
        onTap={managerAutoLogin}
      >
        Login as a manager
      </Button>
    </StyledAutoLogin>
  );
}

export default AutoLogin;
