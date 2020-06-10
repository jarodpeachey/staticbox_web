/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import '../components/style.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { CustomThemeProvider } from '../components/theme';
import { isBrowser } from '../utils/isBrowser';

const theme = {
  shadow: {
    one:
      '0 0 4px 0 rgba(17,22,26,0.08), 0 2px 4px 0 rgba(17,22,26, 0.03), 0 4px 8px 0 rgba(17,22,26, 0.03)',
    two:
      '0 0 8px 0 rgba(17,22,26,0.08), 0 4px 8px 0 rgba(17,22,26, 0.03), 0 8px 16px 0 rgba(17,22,26, 0.03)',
    three:
      '0 4px 16px 4px rgba(17,22,26,0.08), 0 4px 8px 0 rgba(17,22,26, 0.03), 0 16px 24px 0 rgba(17,22,26, 0.03)',
    four:
      '0 4px 24px 8px rgba(17,22,26,0.08), 0 8px 16px 0 rgba(17,22,26, 0.03), 0 32px 40px 0 rgba(17,22,26, 0.03)',
  },
  radius: {
    one: '4px',
    two: '6.5px',
    three: '10.5px',
    four: '17px',
    five: '27.5px',
    six: '45px',
    seven: '73px',
  },
  spacing: {
    one: 4,
    two: 6.5,
    three: 10.5,
    four: 17,
    five: 27.5,
    six: 45,
    seven: 73,
  },
  heading: {
    one: 46,
    two: 36,
    three: 27,
    four: 21,
    five: 16,
    six: 13,
  },
  color: {
    success: '#00ab66',
    error: '#ff6347',
    text: {
      paragraph: '#4c5267',
      heading: '#2c2f3b',
      headingLight: '#ffffff',
      paragraphLight: '#ffffff',
      dark: {
        one: '#2c2f3b',
        two: '#4c5267',
        three: '#b5b9c1',
      },
      light: {
        one: '#ffffff',
        two: '#ffffffaa',
        three: '#ffffff80',
      },
    },
    primary: {
      backgroundLight: '#f6faff',
      text: '#0e3d69',
      backgroundDark: '#131b23',
      light: '#308cff',
      main: '#1758d1',
      dark: '#123cbe',
      light_rgb: 'rgb(48, 140, 255)',
      main_rgb: 'rgb(23, 88, 209)',
      dark_rgb: 'rgb(18, 60, 190)',
    },
    secondary: {
      light: '#fab86c',
      main: '#f9853a',
      dark: '#f76b2b',
    },
    gray: {
      one: '#F7F7F7',
      two: '#F1F1F1',
      three: '#EBEBEB',
      four: '#DADBDB',
      five: '#C8CACB',
      six: '#ABAEB0',
      seven: '#929699',
      eight: '#787D81',
      nine: '#464C52',
      ten: '#131B23',
    },
  },
};

export const GlobalStyles = createGlobalStyle`
  :global {
    body {
      background: linear-gradient(
        to right,
        ${theme.color.primary.main},
        ${theme.color.secondary.main}
      );
    }
    p,
    small,
    code,
    ul,
    li,
    input,
    label,
    textarea,
    select {
      color: ${theme.color.text.dark.two};
    }
    strong {
      color: ${theme.color.text.dark.one};
    }
    p,
    small,
    span,
    div,
    select,
    input,
    textarea,
    td,
    th,
    ul,
    li,
    label,
    button {
      font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif !important;
      font-size: 16px;
      font-weight: 400;
    }
    small {
      margin-bottom: ${theme.spacing.two} !important;
      display: block !important;
    }
    textarea {
      margin: 0;
      padding: 0;
    }
    .title {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    }
    .subtitle {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    }
    p {
      line-height: ${theme.spacing.five + 6}px;
      font-size: 18px;
    }
    ul,
    li {
      font-size: 18px;
    }
    small {
      font-size: 14px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.color.text.dark.one};
      font-family: 'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif !important;
    }
    h1,
    h2 {
      margin-bottom: ${theme.spacing.five}px;
      &.bold {
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: ${theme.color.text.dark.one};
      }
    }
    h3,
    h4 {
      margin-bottom: ${theme.spacing.four}px;
      &.bold {
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: ${theme.color.text.dark.one};
      }
    }
    h5,
    h6 {
      margin-bottom: ${theme.spacing.three}px;
    }
    h1 {
      font-size: ${theme.heading.one}px;
    }
    h2 {
      font-size: ${theme.heading.two}px;
    }
    h3 {
      font-size: ${theme.heading.three}px;
    }
    h4 {
      font-size: ${theme.heading.four}px;
    }
    h5 {
      font-size: ${theme.heading.five}px;
    }
    h6 {
      font-size: ${theme.heading.six}px;
    }
    a {
      transition: 0 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    p:last-child {
      margin-bottom: 0;
    }
    .icon {
      filter: hue-rotate(60deg) invert(15%);
    }
    .right {
      text-align: right;
      margin-left: auto;
    }
    .left {
      text-align: left;
      margin-right: auto;
    }
    .center {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
    .ml-10 {
      margin-left: 10% !important;
    }
    .mr-10 {
      margin-right: 10% !important;
    }
    .tablet-mr-10 {
      @media (min-width: 769px) {
        margin-right: 10% !important;
      }
    }
    .tablet-ml-10 {
      @media (min-width: 769px) {
        margin-left: 10% !important;
      }
    }
    .border-none {
      border: 0 !important;
    }
    .bg-light {
      background: ${theme.color.gray.one}90 !important;
    }
    .bg-transparent {
      background: transparent !important;
    }
    .bg-white {
      background: white !important;
    }
    .bg-primary {
      background: ${theme.color.primary.main} !important;
    }
    .dark-1 {
      color: ${theme.color.text.dark.one} !important;
    }
    .dark-2 {
      color: ${theme.color.text.dark.two} !important;
    }
    .dark-3 {
      color: ${theme.color.text.dark.three} !important;
    }
    .light-1 {
      color: ${theme.color.text.light.one} !important;
    }
    .light-2 {
      color: ${theme.color.text.light.two} !important;
    }
    .light-3 {
      color: ${theme.color.text.light.three} !important;
    }
    .max-1 {
      max-width: 350px;
    }
    .max-2 {
      max-width: 500px;
    }
    .max-3 {
      max-width: 650px;
    }
    .max-4 {
      max-width: 800px;
    }
    .m-none {
      margin: 0 !important;
    }
    .m-1 {
      margin: ${theme.spacing.one}px !important;
    }
    .m-2 {
      margin: ${theme.spacing.two}px !important;
    }
    .m-3 {
      margin: ${theme.spacing.three}px !important;
    }
    .m-4 {
      margin: ${theme.spacing.four}px !important;
    }
    .m-5 {
      margin: ${theme.spacing.five}px !important;
    }
    .m-6 {
      margin: ${theme.spacing.six}px !important;
    }
    .m-7 {
      margin: ${theme.spacing.seven}px !important;
    }
    .mx-auto {
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .mx-none {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .mx-1 {
      margin-left: ${theme.spacing.one}px !important;
      margin-right: ${theme.spacing.one}px !important;
    }
    .mx-2 {
      margin-left: ${theme.spacing.two}px !important;
      margin-right: ${theme.spacing.two}px !important;
    }
    .mx-3 {
      margin-left: ${theme.spacing.three}px !important;
      margin-right: ${theme.spacing.three}px !important;
    }
    .mx-4 {
      margin-left: ${theme.spacing.four}px !important;
      margin-right: ${theme.spacing.four}px !important;
    }
    .mx-5 {
      margin-left: ${theme.spacing.five}px !important;
      margin-right: ${theme.spacing.five}px !important;
    }
    .mx-6 {
      margin-left: ${theme.spacing.six}px !important;
      margin-right: ${theme.spacing.six}px !important;
    }
    .mx-7 {
      margin-left: ${theme.spacing.seven}px !important;
      margin-right: ${theme.spacing.seven}px !important;
    }
    .my-none {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    .my-1 {
      margin-top: ${theme.spacing.one}px !important;
      margin-bottom: ${theme.spacing.one}px !important;
    }
    .my-2 {
      margin-top: ${theme.spacing.two}px !important;
      margin-bottom: ${theme.spacing.two}px !important;
    }
    .my-3 {
      margin-top: ${theme.spacing.three}px !important;
      margin-bottom: ${theme.spacing.three}px !important;
    }
    .my-4 {
      margin-top: ${theme.spacing.four}px !important;
      margin-bottom: ${theme.spacing.four}px !important;
    }
    .my-5 {
      margin-top: ${theme.spacing.five}px !important;
      margin-bottom: ${theme.spacing.five}px !important;
    }
    .my-6 {
      margin-top: ${theme.spacing.six}px !important;
      margin-bottom: ${theme.spacing.six}px !important;
    }
    .my-7 {
      margin-top: ${theme.spacing.seven}px !important;
      margin-bottom: ${theme.spacing.seven}px !important;
    }
    .mt-none {
      margin-top: 0 !important;
    }
    .mt-1 {
      margin-top: ${theme.spacing.one}px !important;
    }
    .mt-2 {
      margin-top: ${theme.spacing.two}px !important;
    }
    .mt-3 {
      margin-top: ${theme.spacing.three}px !important;
    }
    .mt-4 {
      margin-top: ${theme.spacing.four}px !important;
    }
    .mt-5 {
      margin-top: ${theme.spacing.five}px !important;
    }
    .mt-6 {
      margin-top: ${theme.spacing.six}px !important;
    }
    .mt-7 {
      margin-top: ${theme.spacing.seven}px !important;
    }
    .mb-none {
      margin-bottom: 0 !important;
    }
    .mb-1 {
      margin-bottom: ${theme.spacing.one}px !important;
    }
    .mb-2 {
      margin-bottom: ${theme.spacing.two}px !important;
    }
    .mb-3 {
      margin-bottom: ${theme.spacing.three}px !important;
    }
    .mb-4 {
      margin-bottom: ${theme.spacing.four}px !important;
    }
    .mb-5 {
      margin-bottom: ${theme.spacing.five}px !important;
    }
    .mb-6 {
      margin-bottom: ${theme.spacing.six}px !important;
    }
    .mb-7 {
      margin-bottom: ${theme.spacing.seven}px !important;
    }
    .ml-none {
      margin-left: 0 !important;
    }
    .ml-1 {
      margin-left: ${theme.spacing.one}px !important;
    }
    .ml-2 {
      margin-left: ${theme.spacing.two}px !important;
    }
    .ml-3 {
      margin-left: ${theme.spacing.three}px !important;
    }
    .ml-4 {
      margin-left: ${theme.spacing.four}px !important;
    }
    .ml-5 {
      margin-left: ${theme.spacing.five}px !important;
    }
    .ml-6 {
      margin-left: ${theme.spacing.six}px !important;
    }
    .ml-7 {
      margin-left: ${theme.spacing.seven}px !important;
    }
    .mr-none {
      margin-right: 0 !important;
    }
    .mr-1 {
      margin-right: ${theme.spacing.one}px !important;
    }
    .mr-2 {
      margin-right: ${theme.spacing.two}px !important;
    }
    .mr-3 {
      margin-right: ${theme.spacing.three}px !important;
    }
    .mr-4 {
      margin-right: ${theme.spacing.four}px !important;
    }
    .mr-5 {
      margin-right: ${theme.spacing.five}px !important;
    }
    .mr-6 {
      margin-right: ${theme.spacing.six}px !important;
    }
    .mr-7 {
      margin-right: ${theme.spacing.seven}px !important;
    }

    .p-none {
      padding: 0 !important;
    }
    .p-1 {
      padding: ${theme.spacing.one}px !important;
    }
    .p-2 {
      padding: ${theme.spacing.two}px !important;
    }
    .p-3 {
      padding: ${theme.spacing.three}px !important;
    }
    .p-4 {
      padding: ${theme.spacing.four}px !important;
    }
    .p-5 {
      padding: ${theme.spacing.five}px !important;
    }
    .p-6 {
      padding: ${theme.spacing.six}px !important;
    }
    .p-7 {
      padding: ${theme.spacing.seven}px !important;
    }
    .px-none {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .px-1 {
      padding-left: ${theme.spacing.one}px !important;
      padding-right: ${theme.spacing.one}px !important;
    }
    .px-2 {
      padding-left: ${theme.spacing.two}px !important;
      padding-right: ${theme.spacing.two}px !important;
    }
    .px-3 {
      padding-left: ${theme.spacing.three}px !important;
      padding-right: ${theme.spacing.three}px !important;
    }
    .px-4 {
      padding-left: ${theme.spacing.four}px !important;
      padding-right: ${theme.spacing.four}px !important;
    }
    .px-5 {
      padding-left: ${theme.spacing.five}px !important;
      padding-right: ${theme.spacing.five}px !important;
    }
    .px-6 {
      padding-left: ${theme.spacing.six}px !important;
      padding-right: ${theme.spacing.six}px !important;
    }
    .px-7 {
      padding-left: ${theme.spacing.seven}px !important;
      padding-right: ${theme.spacing.seven}px !important;
    }
    .py-none {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    .py-1 {
      padding-top: ${theme.spacing.one}px !important;
      padding-bottom: ${theme.spacing.one}px !important;
    }
    .py-2 {
      padding-top: ${theme.spacing.two}px !important;
      padding-bottom: ${theme.spacing.two}px !important;
    }
    .py-3 {
      padding-top: ${theme.spacing.three}px !important;
      padding-bottom: ${theme.spacing.three}px !important;
    }
    .py-4 {
      padding-top: ${theme.spacing.four}px !important;
      padding-bottom: ${theme.spacing.four}px !important;
    }
    .py-5 {
      padding-top: ${theme.spacing.five}px !important;
      padding-bottom: ${theme.spacing.five}px !important;
    }
    .py-6 {
      padding-top: ${theme.spacing.six}px !important;
      padding-bottom: ${theme.spacing.six}px !important;
    }
    .py-7 {
      padding-top: ${theme.spacing.seven}px !important;
      padding-bottom: ${theme.spacing.seven}px !important;
    }
    .pt-none {
      padding-top: 0 !important;
    }
    .pt-1 {
      padding-top: ${theme.spacing.one}px !important;
    }
    .pt-2 {
      padding-top: ${theme.spacing.two}px !important;
    }
    .pt-3 {
      padding-top: ${theme.spacing.three}px !important;
    }
    .pt-4 {
      padding-top: ${theme.spacing.four}px !important;
    }
    .pt-5 {
      padding-top: ${theme.spacing.five}px !important;
    }
    .pt-6 {
      padding-top: ${theme.spacing.six}px !important;
    }
    .pt-7 {
      padding-top: ${theme.spacing.seven}px !important;
    }
    .pb-none {
      padding-bottom: 0 !important;
    }
    .pb-1 {
      padding-bottom: ${theme.spacing.one}px !important;
    }
    .pb-2 {
      padding-bottom: ${theme.spacing.two}px !important;
    }
    .pb-3 {
      padding-bottom: ${theme.spacing.three}px !important;
    }
    .pb-4 {
      padding-bottom: ${theme.spacing.four}px !important;
    }
    .pb-5 {
      padding-bottom: ${theme.spacing.five}px !important;
    }
    .pb-6 {
      padding-bottom: ${theme.spacing.six}px !important;
    }
    .pb-7 {
      padding-bottom: ${theme.spacing.seven}px !important;
    }
    .pl-none {
      padding-left: 0 !important;
    }
    .pl-1 {
      padding-left: ${theme.spacing.one}px !important;
    }
    .pl-2 {
      padding-left: ${theme.spacing.two}px !important;
    }
    .pl-3 {
      padding-left: ${theme.spacing.three}px !important;
    }
    .pl-4 {
      padding-left: ${theme.spacing.four}px !important;
    }
    .pl-5 {
      padding-left: ${theme.spacing.five}px !important;
    }
    .pl-6 {
      padding-left: ${theme.spacing.six}px !important;
    }
    .pl-7 {
      padding-left: ${theme.spacing.seven}px !important;
    }
    .pr-none {
      padding-right: 0 !important;
    }
    .pr-1 {
      padding-right: ${theme.spacing.one}px !important;
    }
    .pr-2 {
      padding-right: ${theme.spacing.two}px !important;
    }
    .pr-3 {
      padding-right: ${theme.spacing.three}px !important;
    }
    .pr-4 {
      padding-right: ${theme.spacing.four}px !important;
    }
    .pr-5 {
      padding-right: ${theme.spacing.five}px !important;
    }
    .pr-6 {
      padding-right: ${theme.spacing.six}px !important;
    }
    .pr-7 {
      padding-right: ${theme.spacing.seven}px !important;
    }
  }
`;

export const StylesProvider = (props) => {
  let scrollbarWidth = 10;

  if (isBrowser()) {
    const outer = isBrowser() && document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    isBrowser() && document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = isBrowser() && document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  } else {
    scrollbarWidth = 10;
  }

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        {/* <StyleWrapper
          theme={theme}
          textColor={theme.color.text.heading}
          width={scrollbarWidth}
        > */}
        <GlobalStyles />
        {props.children}
        {/* </StyleWrapper> */}
      </ThemeProvider>
    </CustomThemeProvider>
  );
};
