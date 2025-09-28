import styled from 'styled-components';

const StyledFormGroup = styled.div`
  grid-column: ${(props) => `span ${props?.$gridspan}`};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;

  width: 100%;

  padding: 1.2rem 0;

  & > input,
  & > select,
  & > textarea {
    width: 100%;
  }
`;

const Label = styled.label`
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-brand-500);
  font-weight: 500;
  font-size: 1.4rem;
`;

const Error = styled.span`
  margin-left: 1rem;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormGroup({ gridspan = 1, label, error, children }) {
  return (
    <StyledFormGroup $gridspan={gridspan}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormGroup>
  );
}

export default FormGroup;
