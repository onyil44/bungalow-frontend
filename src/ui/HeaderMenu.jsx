import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { TbRestore } from 'react-icons/tb';
import DarkModeToggle from './DarkModeToggle';
import { useCurrentUser } from '../features/authentication/useCurrentUser';
import Spinner from './Spinner';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Spinner />;

  return (
    <StyledHeaderMenu>
      {user.role === 'superAdmin' && (
        <li>
          <ButtonIcon onTap={() => navigate('/admin/restore')}>
            <TbRestore />
          </ButtonIcon>
        </li>
      )}
      <li>
        <ButtonIcon onTap={() => navigate('/admin/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
