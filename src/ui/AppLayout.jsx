import { Outlet, useLocation } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';
import { useCurrentUser } from '../features/authentication/useCurrentUser';
import SpinnerFull from './SpinnerFull';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setDarkMode } from '../features/themes/themeSlice';

const StyledAppLayout = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-columns: 26rem minmax(0, 1fr);
  grid-template-rows: auto 1fr;

  overflow: hidden;

  @media ${device.tabletL} {
    grid-template-columns: 18rem minmax(0, 1fr);
  }

  @media ${device.tabletS} {
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  min-width: 0;
  min-height: 0;
  scroll-padding-top: ${import.meta.env.VITE_TOP_H}rem;

  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  @media ${device.tabletS} {
    width: 100%;
    padding: 1rem 2rem;
    padding-top: ${import.meta.env.VITE_TOP_H}rem;

    overflow: auto;
  }
`;

const Container = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  min-width: 0;
`;

function AppLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { user, isLoading } = useCurrentUser();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(
    function () {
      dispatch(setDarkMode(user?.darkMode));
    },
    [dispatch, user?.darkMode],
  );

  useEffect(
    function () {
      if (isSideBarOpen) setIsSideBarOpen(false);
    },
    [location.key],
  );

  if (isLoading) return <SpinnerFull />;

  return (
    <StyledAppLayout>
      <Header setIsSideBarOpen={setIsSideBarOpen} />

      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
