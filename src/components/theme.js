/* eslint-disable import/prefer-default-export */
import React from 'react';

export const theme = {
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

export const ThemeContext = React.createContext();

export const CustomThemeProvider = (props) => {
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};
