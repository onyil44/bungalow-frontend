import styled, { css } from 'styled-components';
import { device } from '../styles/bereakingPoints';

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  align-items: flex-start;

  overflow: hidden;
  font-size: 1.4rem;

  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      padding: 0.5rem 0;
      width: 80rem;

      @media ${device.tabletS} {
        width: 100%;
      }
    `}

    ${(props) =>
    props.type === 'webPageSearchForm' &&
    css`
      padding: 1rem;
      gap: 2rem;

      @media ${device.tabletS} {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 3rem;
      }
    `}

    ${(props) =>
    props.type === 'webPageBungalowBookingForm' &&
    css`
      padding: 1rem;
      gap: 2rem;
      align-items: flex-start;

      .button-box {
        padding-top: 3.7rem;
        margin: 0 auto;
      }

      @media ${device.tabletL} {
        grid-template-columns: repeat(3, 1fr);
        row-gap: 0;

        .button-box {
          grid-row: 1 / span 2;
          grid-column: 3/-1;
          align-self: stretch;
          margin: auto;
          padding: 0;
        }
      }

      @media ${device.tabletS} {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 0;

        .button-box {
          grid-column: 1/-1;
          grid-row: 3/4;
          margin: 1rem auto;
        }
      }

      @media ${device.mobileL} {
        display: flex;
        flex-direction: column;
        margin: auto;
      }
    `}

    ${(props) =>
    props.type === 'webPageCreateBookingForm' &&
    css`
      font-size: 1.6rem;
      padding: 2.4rem 4rem;

      @media ${device.mobileL} {
        padding: 1.8rem 2rem;
      }

      @media ${device.mobileM} {
        padding: 0.3rem 0.5rem;
      }
    `}

    
    
    ${(props) => css`
    padding-left: ${props.$paddingy ? props.$paddingy + 'rem' : undefined};
    padding-right: ${props.$paddingy ? props.$paddingy + 'rem' : undefined};
  `}
`;

function Form({ columns = '1fr', type, children, ...props }) {
  return (
    <StyledForm $columns={columns} type={type} {...props}>
      {children}
    </StyledForm>
  );
}

export default Form;
