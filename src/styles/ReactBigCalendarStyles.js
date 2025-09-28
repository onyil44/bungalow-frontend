import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

const ReactBigCalenderStyles = styled.createGlobalStyle`
  .rbc-event,
  .rbc-day-slot .rbc-background-event {
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
  }

  .rbc-month-view .rbc-row-bg .rbc-day-bg.twm-selected {
    background: color-mix(in srgb, var(--color-brand-500) 18%, transparent);
    border-radius: 6px;
  }

  .rbc-month-view .rbc-row-bg .rbc-day-bg.twm-selected-edge {
    background: color-mix(in srgb, var(--color-brand-500) 25%, transparent);
    box-shadow: inset 0 0 0 2px var(--color-brand-500);
    border-radius: 6px;
  }

  /* Disabled (before minDate) */
  .rbc-month-view .rbc-row-bg .rbc-day-bg.twm-disabled {
    pointer-events: none;
    opacity: 0.45;
    filter: grayscale(0.35);
  }

  /* Selected range fill */
  .rbc-month-view .rbc-row-bg .rbc-day-bg.twm-selected {
    background: rgba(0, 120, 215, 0.18);
    border-radius: 6px;
  }

  /* Start/end edges */
  .rbc-month-view .rbc-row-bg .rbc-day-bg.twm-selected-edge {
    background: rgba(0, 120, 215, 0.25);
    box-shadow: inset 0 0 0 2px var(--color-brand-500);
    border-radius: 6px;
  }
`;

export default ReactBigCalenderStyles;
