import type { Theme as NavigationTheme } from '@react-navigation/native';

export interface ExtendedTheme extends NavigationTheme {
  colors: NavigationTheme['colors'] & {
    header: string;
  };
}



export const LightTheme: ExtendedTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: '#F2F5EA',
    header: '#DDD',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: '#a9b6b7',
    notification: 'rgb(255, 59, 48)',
  },
};

export const DarkTheme: ExtendedTheme = {
    dark: true,
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: '#202736',
      header: '#222',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: '#000',
      notification: 'rgb(255, 69, 58)',
    },
  };