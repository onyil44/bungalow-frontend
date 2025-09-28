import styled from "styled-components";

const SpinnerItem = styled.div`
  /* HTML: <div class="loader"></div> */

  position: absolute;
  top: 50%;
  left: 50%;

  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid var(--color-brand-700);
  animation: l20-1 0.8s infinite linear alternate, l20-2 1.6s infinite linear;

  @keyframes l20-1 {
    0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }
    12.5% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 0%,
        100% 0%,
        100% 0%
      );
    }
    25% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        100% 100%,
        100% 100%
      );
    }
    50% {
      clip-path: polygon(
        50% 50%,
        0 0,
        50% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    62.5% {
      clip-path: polygon(
        50% 50%,
        100% 0,
        100% 0%,
        100% 0%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    75% {
      clip-path: polygon(
        50% 50%,
        100% 100%,
        100% 100%,
        100% 100%,
        100% 100%,
        50% 100%,
        0% 100%
      );
    }
    100% {
      clip-path: polygon(
        50% 50%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        50% 100%,
        0% 100%
      );
    }
  }
  @keyframes l20-2 {
    0% {
      transform: translate(-50%, -50%) scaleY(1) rotate(0deg);
    }
    49.99% {
      transform: translate(-50%, -50%) scaleY(1) rotate(135deg);
    }
    50% {
      transform: translate(-50%, -50%) scaleY(-1) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) scaleY(-1) rotate(-135deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  width: calc(100vw - 1rem);
  height: calc(100vh - 1rem);
  z-index: 9999;
  backdrop-filter: blur(4px) drop-shadow(4px 4px 10px blue) grayscale(30%);
`;

function SpinnerFull() {
  return (
    <SpinnerContainer>
      <SpinnerItem />
    </SpinnerContainer>
  );
}

export default SpinnerFull;
