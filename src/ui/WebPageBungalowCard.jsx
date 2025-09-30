import styled from 'styled-components';

import { formatCurrency } from '../utils/helpers.js';
import Button from './Button.jsx';
import { useNavigate } from 'react-router';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Spinner from './Spinner.jsx';
import { device } from '../styles/bereakingPoints.js';
import { ENV } from '../../config/env.js';

const StyledWebPageBungalowCard = styled.div`
  background-color: var(--color-background);

  border-radius: var(--border-radius-sm);

  min-height: 100%;

  position: relative;

  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 2px,
    rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px,
    rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px,
    rgba(0, 0, 0, 0.07) 0px 32px 64px;

  transition: all 0.1s ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);

      box-shadow:
        rgba(0, 0, 0, 0.09) 0px 2px 1px,
        rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px,
        rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
  }

  &.card-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  &.card-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  &.card-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.card-exit-active {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderImgContainer = styled.div`
  min-height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  border-top-right-radius: var(--border-radius-sm);
  border-top-left-radius: var(--border-radius-sm);
`;

const BungalowName = styled.div`
  position: absolute;
  bottom: 0;

  font-size: 1.8rem;

  padding: 1rem 2rem;
  width: 100%;
  font-weight: 600;

  color: var(--color-brand-600);
  background-color: var(--color-background-transparent-7);
`;

const CardBody = styled.div`
  padding: 1.5rem 2.5rem;
  margin-bottom: 6rem;

  @media ${device.laptop} {
    font-size: 1.4rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: var(--color-background-muted);
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const BungalowDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const BungalowDetailsLabel = styled.span`
  font-weight: 600;
  color: var(--color-brand-500);
`;

const BungalowDetailsText = styled.span`
  .invalid {
    font-size: 1.2rem;
    font-style: italic;
    text-decoration: line-through;
    color: red;
  }
`;

function WebPageBungalowCard({ bungalow, ref }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const navigate = useNavigate();

  return (
    <StyledWebPageBungalowCard ref={ref}>
      <CardHeader>
        <HeaderImgContainer>
          {!isImgLoaded && <Spinner />}

          <Img
            src={ENV.APP_URL + 'data' + bungalow.image}
            alt={bungalow.name}
            onLoad={() => setIsImgLoaded(true)}
            style={{ display: isImgLoaded ? 'block' : 'none' }}
          />
        </HeaderImgContainer>
        <BungalowName>
          <span>{bungalow.name}</span>
        </BungalowName>
      </CardHeader>
      <CardBody>
        <BungalowDetails>
          <BungalowDetailsLabel>Capacity :</BungalowDetailsLabel>{' '}
          <BungalowDetailsText>
            Up to {bungalow.maxCapacity} guests
          </BungalowDetailsText>
          <BungalowDetailsLabel>Price :</BungalowDetailsLabel>{' '}
          {bungalow.discount ? (
            <BungalowDetailsText>
              {formatCurrency(bungalow.regularPrice - bungalow.discount)}{' '}
              <span className="invalid">
                {' '}
                {formatCurrency(bungalow.regularPrice)}
              </span>
            </BungalowDetailsText>
          ) : (
            <BungalowDetailsText>
              {formatCurrency(bungalow.regularPrice)}
            </BungalowDetailsText>
          )}
        </BungalowDetails>
      </CardBody>

      <CardFooter>
        <Button
          type="button"
          $variation="primary"
          $size="medium"
          onClick={() => navigate(`/web/bungalows/${bungalow._id}`)}
        >
          <HiMagnifyingGlass /> Details
        </Button>
      </CardFooter>
    </StyledWebPageBungalowCard>
  );
}

export default WebPageBungalowCard;
