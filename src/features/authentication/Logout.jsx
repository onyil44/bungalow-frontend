import { HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';

function Logout() {
  const { logout, isLogingout } = useLogout();

  return (
    <ButtonIcon onTap={logout} disabled={isLogingout}>
      <HiArrowRightEndOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
