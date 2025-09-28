import {
  HiArrowRightEndOnRectangle,
  HiHome,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import { NavLink } from 'react-router';
import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';

const NavList = styled.ul`
  display: flex;

  li {
    padding: 0 0.5rem;
  }

  & > li:not(:first-child) {
    border-left: 1px solid var(--color-grey-700);
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.75rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;

  color: var(--color-brand-600);

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--color-grey-0);
      background-color: var(--color-brand-500);

      svg {
        color: var(--color-grey-0);
      }
    }
  }

  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-0);
    background-color: var(--color-brand-500);
  }

  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-grey-0);
  }

  @media ${device.tablet} {
    & > span {
      display: none;
    }
  }
`;

function WebPageHeaderMenu() {
  return (
    <NavList>
      <li>
        <StyledNavLink to="/web/homePage">
          <HiHome />
          <span>Home</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/web/bungalows">
          <HiOutlineHomeModern />
          <span>Bungalows</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/login">
          <HiArrowRightEndOnRectangle />
          <span>Login</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
}

export default WebPageHeaderMenu;
