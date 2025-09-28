import { useLocation, useParams } from 'react-router';
import { useCabin } from './useCabin';
import Spinner from '../../ui/Spinner';
import Carousel from '../../ui/Carousel';
import styled from 'styled-components';
import { useSettings } from '../settings/useSettings';
import WebPageBungalowDataBox from './WebPageBungalowDataBox';
import WebPageBungalowBookingBox from './WebPageBungalowBookingBox';
import { HiHomeModern } from 'react-icons/hi2';
import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

const CarouselContainer = styled.div`
  position: relative;
  margin-left: calc(((150 * var(--rem-size)) - 100vw) / 2);

  @media (max-width: 1500px) and (min-width: 1440px) {
    margin-left: 0;
  }

  @media (max-width: 1200px) {
    margin-left: 0;
  }

  top: -2rem;
  width: 100vw;
  height: 50rem;
`;

const BungalowDetailsContainer = styled.div`
  position: relative;
  width: 95%;
  margin: 0 auto;
  margin-top: -8rem;

  box-shadow:
    rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const BungalowDetailsHeader = styled.div`
  height: 6rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-size: 1.8rem;
  font-weight: 600;

  padding: 0 2rem;

  background-color: var(--color-brand-400);
  color: var(--color-grey-0);
`;

const BungalowDetailsContainerWrapper = styled.div`
  z-index: 50;
  &.bungalowdetail-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  &.bungalowdetail-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  &.bungalowdetail-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.bungalowdetail-exit-active {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
`;

function WebPageBungalowDetail() {
  const { bungalowId } = useParams();
  const location = useLocation();

  const nodeRef = useMemo(() => React.createRef(), [bungalowId]);

  const { cabin: bungalow, isCabinLoading } = useCabin(bungalowId);
  const { settings, isPending: isSettingsLoading } = useSettings();
  const setting = settings?.find((setting) => setting.isActive);

  const isLoading = isCabinLoading || isSettingsLoading;

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <CarouselContainer>
          <Carousel images={bungalow.images} />
        </CarouselContainer>
      )}
      <CSSTransition
        key={`${bungalowId}-${location.key}`}
        in={!isLoading}
        timeout={400}
        classNames="bungalowdetail"
        nodeRef={nodeRef}
        unmountOnExit
        appear
      >
        <BungalowDetailsContainerWrapper ref={nodeRef}>
          {!isLoading && (
            <BungalowDetailsContainer>
              <BungalowDetailsHeader>
                {' '}
                <HiHomeModern />
                <span>{bungalow?.name}</span>
              </BungalowDetailsHeader>
              <WebPageBungalowBookingBox
                bungalow={bungalow}
                setting={setting}
              />
              <WebPageBungalowDataBox bungalow={bungalow} setting={setting} />
            </BungalowDetailsContainer>
          )}
        </BungalowDetailsContainerWrapper>
      </CSSTransition>
    </>
  );
}

export default WebPageBungalowDetail;
