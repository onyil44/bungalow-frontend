import styled, { css } from 'styled-components';
import { useTap } from '../hooks/useTap';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  mediumSmall: css`
    font-size: 1.3rem;
    padding: 0.8rem 1.2rem;
    font-weight: 500;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-brand-600);
      }
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-grey-50);
      }
    }
  `,
  'brand-soft': css`
    color: var(--color-brand-500);
    background: var(--color-grey-200);
    border: 1px solid var(--color-brand-200);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--color-grey-0);
        background-color: var(--color-grey-400);
      }
    }
  `,
  blue: css`
    color: var(--color-blue-100);
    background: var(--color-blue-700);
    border: 1px solid var(--color-grey-200);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-blue-800);
      }
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-red-800);
      }
    }
  `,
  edit: css`
    color: var(--color-yellow-100);
    background-color: var(--color-yellow-700);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-yellow-800);
      }
    }
  `,
  'filter-button': css`
    background-color: var(--color-grey-0);
    border: none;

    ${(props) =>
      props.$active === 'true' &&
      css`
        background-color: var(--color-brand-500);
        color: var(--color-brand-50);
      `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: var(--color-brand-500);
        color: var(--color-brand-50);
      }
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &span {
    display: inline-block;
  }

  ${(props) =>
    props.$isSideBar &&
    css`
      svg {
        font-size: 2.5rem;
      }
    `}

  ${(props) => variations[props.$variation]};
  ${(props) => sizes[props.$size]}
`;

function Button({ onTap, ref, ...rest }) {
  const tapProps = useTap(onTap);
  return <StyledButton ref={ref} {...tapProps} {...rest} />;
}

export default Button;
