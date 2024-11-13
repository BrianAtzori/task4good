import {darkTheme} from './custom-theme-dark';
import {lightTheme} from './custom-theme-light';

export const lightNavigationTheme = {
  dark: false,
  colors: {
    background: lightTheme['color-basic-100'],
    card: lightTheme['color-basic-100'],
    text: lightTheme['color-basic-900'],
    border: lightTheme['color-basic-200'],
    primary: lightTheme['color-primary-500'],
    notification:
      lightTheme['color-secondary-500'] || lightTheme['color-primary-300'],
  },
  fonts: {
    regular: {fontFamily: 'System', fontWeight: '400' as '400'},
    medium: {fontFamily: 'System', fontWeight: '500' as '500'},
    bold: {fontFamily: 'System', fontWeight: '700' as '700'},
    heavy: {fontFamily: 'System', fontWeight: '900' as '900'},
  },
};

export const darkNavigationTheme = {
  dark: true,
  colors: {
    background: darkTheme['color-basic-100'],
    card: darkTheme['color-basic-100'],
    text: darkTheme['color-basic-900'],
    primary: darkTheme['color-primary-500'],
    border: darkTheme['color-basic-200'],
    notification:
      darkTheme['color-secondary-500'] || darkTheme['color-primary-300'],
  },
  fonts: {
    regular: {fontFamily: 'System', fontWeight: '400' as '400'},
    medium: {fontFamily: 'System', fontWeight: '500' as '500'},
    bold: {fontFamily: 'System', fontWeight: '700' as '700'},
    heavy: {fontFamily: 'System', fontWeight: '900' as '900'},
  },
};
