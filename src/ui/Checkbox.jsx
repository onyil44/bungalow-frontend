import styled, { css } from 'styled-components';
import { device } from '../styles/bereakingPoints';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  & input[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  ${(props) => {
    if (props.type === 'webPageBungalowBookingCheckBox')
      return css`
        padding-top: 3.8rem;

        & input[type='checkbox'] {
          height: 3.7rem;
          width: 3.7rem;
        }

        & label {
          text-wrap: nowrap;

          @media ${device.tabletL} {
            text-wrap: wrap;
          }
        }
      `;
    if (props.type === 'priceLabel')
      return css`
        & label {
          font-family: 'Sono';
        }
      `;
  }}
`;

function Checkbox({
  checked,
  onChange,
  type = 'regular',
  disabled = false,
  id,
  children,
  ...props
}) {
  return (
    <StyledCheckbox type={type}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
