import styled from 'styled-components';

const StyledWebPageFooter = styled.footer`
  /* position: fixed;
  bottom: 0;
  right: 0;
  left: 0; */
  z-index: 1000;

  padding-bottom: env(safe-area-inset-bottom);
  padding-inline: max(16px, env(safe-area-inset-left))
    max(16px, env(safe-area-inset-right));

  color: var(--color-brand-50);
  width: 100%;
  min-height: var(--web-footer-height);
  background-color: var(--color-brand-600);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }
`;

function WebPageFooter() {
  return (
    <StyledWebPageFooter>
      <p>All rights reserved. Please contact onur@onyilprojects.com</p>
    </StyledWebPageFooter>
  );
}

export default WebPageFooter;
