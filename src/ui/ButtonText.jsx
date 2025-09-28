import styled from 'styled-components';
import { useTap } from '../hooks/useTap';

const StyledButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--color-brand-700);
    }
  }

  &:active {
    color: var(--color-brand-700);
  }
`;

function ButtonText({ onTap, ref, ...rest }) {
  const tapProps = useTap(onTap);
  return <StyledButtonText ref={ref} {...tapProps} {...rest} />;
}

export default ButtonText;
