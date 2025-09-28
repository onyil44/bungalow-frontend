import styled, { css } from 'styled-components';

const variations = {
  modal: css`
    color: var(--color-brand-700);
  `,
  login: css`
    text-align: center;
  `,
  searchBox: css`
    color: var(--color-brand-500);
  `,
};

const Heading = styled.h1`
  color: var(--color-brand-600);
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
    `}
      
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
    `}
      
  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
    `}
      
  ${(props) =>
    props.as === 'h5' &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
    `}
      
    ${(props) => variations[props.$variation]}
  
  line-height: 1.4;
`;

export default Heading;
