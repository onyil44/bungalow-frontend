import styled from 'styled-components';

import { device } from '../styles/bereakingPoints';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  overflow: visible;

  padding: 1.2rem 0;

  & > input,
  & > select,
  & > textarea {
    width: 100%;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media ${device.tablet} {
    grid-template-columns: 20rem repeat(2, 1fr);
  }

  @media ${device.tabletS} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, id = null }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={id || children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
