import styled from 'styled-components';
import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';
import { device } from '../styles/bereakingPoints';
import Logo from './Logo';
import Button from '../ui/Button.jsx';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { HiMiniBars3, HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router';
import { ENV } from '../../config/env.js';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-end;
  position: static;

  @media ${device.tabletS} {
    z-index: 1000;

    /* Vite env + safe-area dahil yükseklik */
    height: ${ENV.VITE_TOP_H}rem;

    /* Yalnızca yatay ve üst güvenli alan dolgusunu bırak */
    padding: 0 max(16px, env(safe-area-inset-left)) 0
      max(16px, env(safe-area-inset-right));
    padding-top: env(safe-area-inset-top);

    display: flex;
    align-items: center; /* dikey merkezleme */
    justify-content: space-between; /* yatay düzen; istersen center yap */

    backdrop-filter: blur(8px);
    background: color-mix(in srgb, var(--color-grey-100) 80%, transparent);
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

function Header({ setIsSideBarOpen }) {
  const isTableSorSmaller = useMediaQuery(device.tabletS);
  const navigate = useNavigate();

  return (
    <StyledHeader>
      {isTableSorSmaller && (
        <Button
          type="button"
          $variation="secondary"
          $size="mediumSmall"
          $isSideBar={true}
          onTap={() => setIsSideBarOpen((isSideBarOpen) => !isSideBarOpen)}
        >
          <HiMiniBars3 />
        </Button>
      )}

      {isTableSorSmaller ? (
        <Logo
          type="app-mini"
          $variation="headerlogo"
          onTap={() => navigate('/admin')}
        />
      ) : null}
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
