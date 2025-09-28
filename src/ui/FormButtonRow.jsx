import styled, { css } from 'styled-components';

const positions = {
  start: css`
    justify-content: flex-start;
  `,
  end: css`
    justify-content: flex-end;
  `,
  center: css`
    justify-content: center;
  `,
};

const FormButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-right: 1.2rem;
  justify-content: flex-end;

  padding-top: 1.2rem;

  ${(props) => positions[props.$position]}
`;

export default FormButtonRow;
