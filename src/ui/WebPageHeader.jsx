import styled from 'styled-components';
import Logo from './Logo';
import WebPageHeaderMenu from './WebPageHeaderMenu';
import WebPageHeaderText from './WebPageHeaderText';
import { device } from '../styles/bereakingPoints';

const StyledWebPageHeader = styled.header`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  z-index: 1000;

  padding-top: env(safe-area-inset-top);
  padding-inline: max(16px, env(safe-area-inset-left))
    max(16px, env(safe-area-inset-right));

  width: 100%;
  background-color: var(--color-background);
  box-shadow: var(--web-header-shadow);

  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: stretch;

  @media ${device.mobileL} {
    gap: 0;
  }
`;

const WebPageHeaderLogoContainer = styled.div`
  background-color: var(--color-background-muted);
  clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
  padding: 0.5rem 8.6rem 0.5rem 4.8rem;

  margin-left: -16px;
`;

const WebPageHeaderMenuContainer = styled.div`
  padding: 0.5rem 4.8rem 0.5rem 8.6rem;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    padding: 0.5rem 2.4rem 0.5rem 4.8rem;
  }

  @media ${device.tabletS} {
    padding: 0.5rem 2rem;
  }
`;

const WebPageHeaderTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

function WebPageHeader() {
  return (
    <StyledWebPageHeader>
      <WebPageHeaderLogoContainer>
        <Logo type="webpage" />
      </WebPageHeaderLogoContainer>
      <WebPageHeaderTextContainer>
        <WebPageHeaderText />
      </WebPageHeaderTextContainer>
      <WebPageHeaderMenuContainer>
        <WebPageHeaderMenu />
      </WebPageHeaderMenuContainer>
    </StyledWebPageHeader>
  );
}

export default WebPageHeader;
