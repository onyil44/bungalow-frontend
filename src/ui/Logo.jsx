import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { getDarkMode } from '../features/themes/themeSlice';
import { device } from '../styles/bereakingPoints';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { matchPath, useLocation } from 'react-router';

const StyledLogo = styled.div`
  text-align: center;

  ${(props) => {
    if (props.$variation === 'headerlogo') {
      return css`
        height: 85%;
      `;
    }
    if (props.$variation === 'sidebarlogo') {
      return css`
        width: 100%;
      `;
    }
  }}

  @media ${device.tabletS} {
    margin-right: auto;
  }
`;

const Img = styled.img`
  ${(props) =>
    props.$type === 'app' &&
    css`
      height: 15rem;
      width: auto;

      @media ${device.tabletL} {
        width: 100%;
        height: auto;
      }
    `}

  ${(props) =>
    props.$type === 'app-mini' &&
    css`
      height: 100%;
      width: auto;
    `};
  ${(props) =>
    props.$type === 'webpage' &&
    css`
      height: 10rem;
      width: auto;
    `}
`;

function Logo({ type = 'app', $variation, onClick }) {
  const darkMode = useSelector(getDarkMode);
  const isTabletSorSmaller = useMediaQuery(device.tabletS);
  const location = useLocation();
  const matchWeb = matchPath('/web/*', location.pathname);
  const isWebSite = matchWeb?.pathnameBase === '/web';

  let imgSrc = '/logo-light.png';

  if (darkMode && !isTabletSorSmaller) imgSrc = '/logo-dark.png';
  if (!darkMode && isTabletSorSmaller && !isWebSite)
    imgSrc = '/logo_mini-light.png';
  if (!darkMode && isTabletSorSmaller && isWebSite)
    imgSrc = '/logo_web_mini-light.png';
  if (darkMode && isTabletSorSmaller && !isWebSite)
    imgSrc = '/logo_mini-dark.png';

  return (
    <StyledLogo $variation={$variation} onClick={onClick}>
      <Img
        $type={type}
        src={process.env.APP_URL + 'data/public' + imgSrc}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
