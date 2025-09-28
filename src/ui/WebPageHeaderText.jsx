import styled from 'styled-components';
import { device } from '../styles/bereakingPoints';

const TextContainer = styled.div`
  font-family: 'Mozilla Headline', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
  font-variation-settings: 'wdth' 100;
  font-size: 2.2rem;
  color: var(--color-brand-600);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;

  div:first-child {
    grid-column: 1 / 3;
  }

  div:last-child {
    grid-column: 2 / -1;
  }

  @media ${device.tabletS} {
    display: flex;
    flex-direction: column;
    font-size: 2rem;

    & div {
      max-width: 10rem;

      &:last-child {
        display: none;
      }
    }
  }

  @media ${device.mobileL} {
    display: none;
  }
`;

function WebPageHeaderText() {
  return (
    <TextContainer>
      <div>Escape to Nature</div>
      <div>Stay in Comfort</div>
    </TextContainer>
  );
}

export default WebPageHeaderText;
