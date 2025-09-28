import styled from 'styled-components';

import WebPageHeader from './WebPageHeader';
import WebPageFooter from './WebPageFooter';
import { Outlet } from 'react-router';

const StyledWebPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: var(--app-h, 100vh);
  height: var(--app-h, 100dvh);

  overflow: hidden;
`;

const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  background-color: var(--color-stone-50);
  overflow: auto;
  padding-top: 3rem;
  padding-bottom: 3rem;

  overflow: auto;
`;

const Container = styled.div`
  max-width: min(100vw, 150rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function WebPageLayout() {
  return (
    <StyledWebPageLayout>
      <WebPageHeader />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <WebPageFooter />
    </StyledWebPageLayout>
  );
}

export default WebPageLayout;
