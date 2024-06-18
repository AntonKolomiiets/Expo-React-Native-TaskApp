import React, { createContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
// import type { Theme } from '@react-navigation/native';
import { LightTheme, DarkTheme, ExtendedTheme } from './theme';

interface ThemeContextProps {
  theme: ExtendedTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: LightTheme,
  toggleTheme: () => {},
});

ThemeContext.displayName = 'ThemeContext';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? DarkTheme : LightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.dark ? LightTheme : DarkTheme));
  };

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    });
    return () => subscription.remove();
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
