import { NavLink } from 'react-router';
import styled from 'styled-components';
import {
  HiMiniUserGroup,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { TbCalendarPlus } from 'react-icons/tb';
import { useCurrentUser } from '../features/authentication/useCurrentUser';
import Spinner from './Spinner';
import { device } from '../styles/bereakingPoints';

const StyledNav = styled.nav`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: auto;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  @media ${device.tabletL} {
    font-size: 1.2rem;
  }

  @media ${device.tabletS} {
    display: none;
  }

  /* This works because react-router places the active class on the active NavLink */

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--color-grey-800);
      background-color: var(--color-grey-50);
      border-radius: var(--border-radius-sm);

      svg {
        color: var(--color-brand-600);
      }
    }
  }

  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;

    @media ${device.tabletL} {
      display: none;
    }

    @media ${device.tabletS} {
      display: block;
    }
  }

  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav({ onNavigate }) {
  const { user, isLoading } = useCurrentUser();
  const userActionsAllowedRoles = ['manager', 'admin', 'superAdmin'];

  if (isLoading) return <Spinner />;

  return (
    <StyledNav>
      <NavList>
        <li>
          <StyledNavLink to="/admin/dashboard" onClick={onNavigate}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/newBooking" onClick={onNavigate}>
            <TbCalendarPlus />
            <span>New Booking</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/bookings" onClick={onNavigate}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/guests" onClick={onNavigate}>
            <HiMiniUserGroup />
            <span>Guests</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/admin/cabins" onClick={onNavigate}>
            <HiOutlineHomeModern />
            <span>Bungalows</span>
          </StyledNavLink>
        </li>

        {userActionsAllowedRoles.includes(user?.role) && (
          <li>
            <StyledNavLink to="/admin/users" onClick={onNavigate}>
              <HiOutlineUsers />
              <span>Users</span>
            </StyledNavLink>
          </li>
        )}

        <li>
          <StyledNavLink to="/admin/settings" onClick={onNavigate}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledNav>
  );
}

export default MainNav;
