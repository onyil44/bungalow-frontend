import styled from 'styled-components';
import Heading from './Heading';
import { device } from '../styles/bereakingPoints';

const WebPageHomePageTextContainer = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  margin-right: 20rem;
  margin-bottom: 3rem;

  @media ${device.laptop} {
    font-size: 1.6rem;
  }

  @media ${device.tabletS} {
    margin-right: 10rem;
  }

  @media ${device.mobileL} {
    margin-right: 0;
  }

  h1 {
    color: var(--color-brand-500);
    font-size: 4.5rem;
    margin-bottom: 2rem;

    font-family: 'Mozilla Headline', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;

    @media ${device.laptop} {
      font-size: 3.6rem;
    }
  }

  h2 {
    color: var(--color-brand-500);
    font-size: 3rem;
    margin-bottom: 1rem;

    font-family: 'Mozilla Headline', sans-serif;
    font-optical-sizing: auto;
    font-style: normal;

    @media ${device.laptop} {
      font-size: 2rem;
    }
  }
`;

function WebPageHomePageText() {
  return (
    <WebPageHomePageTextContainer>
      <h1>Forest Bongalows</h1>
      <h2>Sleep Under the Stars, Wake Up in the Forest</h2>
      <span>
        Experience the charm of forest living with our cozy bungalows, blending
        natural serenity with modern comfort and authentic hospitality
      </span>
    </WebPageHomePageTextContainer>
  );
}

export default WebPageHomePageText;
