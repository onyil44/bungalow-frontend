import styled from 'styled-components';
import CarouselImage from './CarouselImage';
import { useEffect, useRef, useState } from 'react';

import { HiChevronDoubleRight, HiChevronDoubleLeft } from 'react-icons/hi2';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { device } from '../styles/bereakingPoints';

const StyledCarousel = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  gap: 0.5rem;
  overflow: hidden;

  background-color: var(--color-background-muted);
`;

const CarouselButtonBase = styled.button`
  height: 100%;
  z-index: 1;
  font-size: 4rem;
  padding: 0 2rem;

  opacity: 0.5;

  top: 0;
  bottom: 0;

  border: none;

  svg {
    fill: var(--color-brand-500);
    width: 4rem;
    height: 4rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 0.8;
      transition: all 0.2s ease-in;
    }
  }

  @media ${device.tablet} {
    padding: 0;
  }
`;

const CarouselButtonNext = styled(CarouselButtonBase)`
  position: absolute;
  right: 0;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
const CarouselButtonPrev = styled(CarouselButtonBase)`
  position: absolute;
  left: 0;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const CarouselTrack = styled.div`
  display: flex;
  ${(props) => `transform:translateX(${props.$translatex}%)`};
  transition: all 0.4s ease-in-out;
`;

function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStartX, setTouchStartX] = useState(null);
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  const lastIndex = extendedImages.length - 1;

  const [isHover, setIsHover] = useState(false);
  const indexRef = useRef(activeIndex);
  indexRef.current = activeIndex;

  const isTabletLorSmaller = useMediaQuery(device.tabletL);

  let translatex = 25 - 50 * activeIndex;

  if (isTabletLorSmaller) translatex = -1 * 100 * activeIndex;

  const intervalRef = useRef(null);

  function clearSliderInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startSliderInterval() {
    clearSliderInterval();
    intervalRef.current = setInterval(() => {
      if (!isHover) {
        setActiveIndex((activeIndex) =>
          activeIndex !== lastIndex - 1 ? activeIndex + 1 : 1,
        );
      }
    }, 4000);
  }

  useEffect(() => {
    startSliderInterval();
    return () => clearSliderInterval();
  }, [lastIndex, isHover]);

  function goPreviousImage() {
    clearSliderInterval();
    setActiveIndex((activeIndex) =>
      activeIndex !== 1 ? activeIndex - 1 : lastIndex - 1,
    );
  }

  function goNextImage() {
    clearSliderInterval();
    setActiveIndex((activeIndex) =>
      activeIndex !== lastIndex - 1 ? activeIndex + 1 : 1,
    );
  }

  function handleTounchStart(e) {
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e) {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) goNextImage();
    if (diff < -50) goPreviousImage();

    setTouchStartX(null);
  }

  return (
    <StyledCarousel
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={handleTounchStart}
      onTouchEnd={handleTouchEnd}
    >
      <CarouselButtonPrev type="button" onClick={goPreviousImage}>
        <HiChevronDoubleLeft />
      </CarouselButtonPrev>
      <CarouselTrack $translatex={translatex}>
        {extendedImages.map((image, i) => (
          <CarouselImage key={i} image={image} />
        ))}
      </CarouselTrack>
      <CarouselButtonNext type="button" onClick={goNextImage}>
        <HiChevronDoubleRight />
      </CarouselButtonNext>
    </StyledCarousel>
  );
}

export default Carousel;
