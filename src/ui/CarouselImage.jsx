import { useState } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import { device } from '../styles/bereakingPoints';
import { ENV } from '../../config/env';

const CarouselImageContainer = styled.div`
  flex: 0 0 50%;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* taşmaları gizle */

  @media ${device.tabletL} {
    flex-basis: 100%;
  }
`;

const StyledCarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function CarouselImage({ image }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CarouselImageContainer>
      {!isLoaded && <Spinner />}

      <StyledCarouselImage
        src={ENV.APP_URL + 'data' + image}
        alt={image}
        onLoad={() => setIsLoaded(true)}
      />
    </CarouselImageContainer>
  );
}

export default CarouselImage;
