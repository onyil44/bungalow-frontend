import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const DatePickerStyles = styled.createGlobalStyle`
  div:has(> .react-datepicker__input-container) {
    width: 100%;

    input {
      border: 1px solid var(--color-grey-300);
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-sm);
      padding: 0.8rem 1.2rem;
      box-shadow: var(--shadow-sm);
      width: 100%;
    }

    svg {
      font-size: 2.2rem;
    }

    svg + input {
      padding-left: 3.5rem;
    }

    .react-datepicker__input-container .react-datepicker__calendar-icon {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .react-datepicker-popper,
  div {
    .react-datepicker {
      font-size: 1.4rem;
      font-family: inherit;
      border-radius: 0.5rem;
      offset: 0px;
      border: 1.5px solid var(--color-brand-500);

      &__day-name,
      &__day,
      &__time-name {
        width: 2.4rem;
        line-height: 2rem;
      }

      &__header,
      &__current-month {
        padding: 0.5rem 1rem;
      }

      &__month-container {
      }

      &__header {
        background-color: var(--color-brand-50);
        border-bottom: 1px solid var(--color-grey-900);
        padding-bottom: 0.5rem;
      }

      &__navigation-icon {
        top: 0.5rem;
      }

      &__current-month {
        font-size: 1.4rem;
        color: var(--color-grey-900);
      }

      &__day-names {
        margin-bottom: 0;
        & > div {
          color: var(--color-grey-900);
        }
      }
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      background-color: var(--color-brand-500);
      color: white;
    }
    @media (hover: hover) and (pointer: fine) {
      .react-datepicker__day:hover {
        background-color: var(--color-brand-100);
      }
    }
  }
`;

export default DatePickerStyles;
