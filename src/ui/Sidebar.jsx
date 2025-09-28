import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import { device } from '../styles/bereakingPoints.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { CSSTransition } from 'react-transition-group';
import Button from './Button.jsx';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick.js';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${device.tabletS} {
    position: absolute;
    z-index: 5000;
    height: 100vh;
    height: 100dvh;
    height: 100svh;
    padding-top: 5rem;
    overflow-y: auto;

    img {
      max-height: 6rem;
    }

    &.sidebar-enter {
      max-width: 0;
      opacity: 0;
      overflow: hidden;
    }

    &.sidebar-enter-active {
      max-width: 500px;
      opacity: 1;
      transition: all 400ms ease-in-out;
    }

    &.sidebar-exit {
      max-width: 500px;
      opacity: 1;
      overflow: hidden;
    }

    &.sidebar-exit-active {
      max-width: 0;
      opacity: 0;
      transition: all 400ms ease-in-out;
    }
  }
`;

const StyledCloseButton = styled(Button)`
  position: absolute;
  top: 2px;
  right: 2px;
`;

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  // const nodeRef = useRef();
  const { ref: nodeRef } = useOutsideClick(setIsSideBarOpen);

  return (
    <>
      {!isTabletSorSmaller && (
        <StyledSidebar>
          <Logo type="app" $variation="sidebarlogo" />
          <MainNav onNavigate={() => setIsSideBarOpen(false)} />
        </StyledSidebar>
      )}
      {isTabletSorSmaller && (
        <CSSTransition
          in={isSideBarOpen}
          timeout={400}
          classNames="sidebar"
          unmountOnExit
          nodeRef={nodeRef}
          enter={true}
          exit={false}
        >
          <StyledSidebar ref={nodeRef}>
            <Logo type="app-mini" />

            <StyledCloseButton
              type="button"
              $variation="secondary"
              $size="mediumSmall"
              $isSideBar={true}
              onClick={() =>
                setIsSideBarOpen((isSideBarOpen) => !isSideBarOpen)
              }
            >
              <HiXMark />
            </StyledCloseButton>

            <MainNav onNavigate={() => setIsSideBarOpen(false)} />
          </StyledSidebar>
        </CSSTransition>
      )}
    </>
  );
}

export default Sidebar;
