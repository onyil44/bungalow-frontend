import { createGlobalStyle } from 'styled-components';
import { device } from './bereakingPoints';

const styled = { createGlobalStyle };
const GlobalStyles = styled.createGlobalStyle`
  :root {
    &,
    &.light-mode {
      --color-brand-50: #e5f4f0;
      --color-brand-100: #bfe3d9;
      --color-brand-200: #99d2c2;
      --color-brand-300: #66bfa6;
      --color-brand-400: #33ac8a;
      --color-brand-500: #08976f;
      --color-brand-600: #005239;
      --color-brand-700: #004231;
      --color-brand-800: #00352a;
      --color-brand-900: #00271f;
      /* Grey */
      --color-grey-0: #fff;
      --color-grey-50: #f9fafb;
      --color-grey-100: #f3f4f6;
      --color-grey-200: #e5e7eb;
      --color-grey-300: #d1d5db;
      --color-grey-400: #9ca3af;
      --color-grey-500: #6b7280;
      --color-grey-600: #4b5563;
      --color-grey-700: #374151;
      --color-grey-800: #1f2937;
      --color-grey-900: #111827;

      --color-blue-100: #e0f2fe;
      --color-blue-700: #0369a1;
      --color-blue-800: #193cb8;
      --color-green-100: #dcfce7;
      --color-green-700: #15803d;
      --color-yellow-100: #fef9c3;
      --color-yellow-700: #a16207;
      --color-yellow-800: #894b00;
      --color-silver-100: #e5e7eb;
      --color-silver-700: #374151;
      --color-indigo-100: #e0e7ff;
      --color-indigo-700: #4338ca;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(255, 255, 255, 0.1);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

      --image-grayscale: 0;
      --image-opacity: 100%;

      --color-stone-50: #fafaf9;
      --color-stone-200: #e7e5e4;

      --color-background: #f3f7f5;
      --color-background-surface: #e1ece7;
      --color-background-muted: #cbdad3;
      --color-background-hover: #dff0ea;
      --color-background-border: #aab8b1;

      --color-background-transparent: rgba(243, 247, 245, 0.9);
      --color-background-transparent-7: rgba(243, 247, 245, 0.7);

      --border-radius-tiny: 3px;
      --border-radius-sm: 5px;
      --border-radius-md: 7px;
      --border-radius-lg: 9px;
    }

    /* For dark mode */

    &.dark-mode {
      --color-brand-50: #0d1e1a;
      --color-brand-100: #12342b;
      --color-brand-200: #174b3c;
      --color-brand-300: #1d6350;
      --color-brand-400: #247b65;
      --color-brand-500: #2b947a;
      --color-brand-600: #33ac8a;
      --color-brand-700: #55bfa3;
      --color-brand-800: #80d2bb;
      --color-brand-900: #b0e5d5;

      --color-grey-0: #18212f;
      --color-grey-50: #111827;
      --color-grey-100: #1f2937;
      --color-grey-200: #374151;
      --color-grey-300: #4b5563;
      --color-grey-400: #6b7280;
      --color-grey-500: #9ca3af;
      --color-grey-600: #d1d5db;
      --color-grey-700: #e5e7eb;
      --color-grey-800: #f3f4f6;
      --color-grey-900: #f9fafb;

      --color-blue-100: #075985;
      --color-blue-700: #e0f2fe;
      --color-green-100: #166534;
      --color-green-700: #dcfce7;
      --color-yellow-100: #854d0e;
      --color-yellow-700: #fef9c3;
      --color-silver-100: #374151;
      --color-silver-700: #f3f4f6;
      --color-indigo-100: #3730a3;
      --color-indigo-700: #e0e7ff;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(0, 0, 0, 0.3);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      --image-grayscale: 10%;
      --image-opacity: 90%;

      --color-stone-50: #1b1b1a;
      --color-stone-200: #2c2b2a;

      --color-background: #121514;
      --color-background-surface: #1e2321;
      --color-background-muted: #2b322f;
      --color-background-hover: #1a2a24;
      --color-background-border: #404944;

      --color-background-transparent: rgba(18, 21, 20, 0.9);
      --color-background-transparent-7: rgba(18, 21, 20, 0.7);

      --border-radius-tiny: 3px;
      --border-radius-sm: 5px;
      --border-radius-md: 7px;
      --border-radius-lg: 9px;
    }

    /* --web-header-height: 8rem; */
    --web-header-shadow: 0px 2px 3px 0px var(--backdrop-color);
    --web-footer-height: 4rem;

    --html-font-size: 62.5%;
    --rem-size: 10px;
  }

  @media ${device.laptopL} {
    :root {
      --html-font-size: 50%;
      --rem-size: 8px;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Creating animations for dark mode */
    transition:
      background-color 0.3s,
      border 0.3s;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  html {
    font-size: var(--html-font-size);
  }

  body {
    font-family: 'Poppins', sans-serif;
    color: var(--color-grey-700);

    transition:
      color 0.3s,
      background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  input,
  textarea,
  select {
    font-size: 16px !important;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 1px solid var(--color-brand-600);
    outline-offset: -0.5px;
  }

  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }

  img,
  video,
  canvas,
  svg {
    max-width: 100%;
    height: auto;

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  table {
    table-layout: fixed;
    width: 100%;
  }
  pre,
  code {
    white-space: pre-wrap;
  }
  :where(p, span, div) {
    overflow-wrap: normal;
  }

  button,
  [role='button'],
  a {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    user-select: none;
  }

  .carousel,
  .swipe-area {
    touch-action: pan-y;
  }
`;

export default GlobalStyles;
