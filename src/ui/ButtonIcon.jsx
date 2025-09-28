import styled from 'styled-components';
import { useTap } from '../hooks/useTap';

const StayledButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-grey-100);
    }
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

function ButtonIcon({ onTap, ref, ...rest }) {
  const tapProps = useTap(onTap);
  return <StayledButtonIcon ref={ref} {...tapProps} {...rest} />;
}

export default ButtonIcon;
