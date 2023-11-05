import React, {useState} from 'react';
import {colors} from './colors';

export interface ThemeInterface {
  colors: any;
  toggleTheme: () => void;
  isLightTheme: boolean;
}

export const ThemeContext = React.createContext<ThemeInterface | null>(null);

const ThemeProvider = ({children}: any) => {
  const [isLightTheme, setLightTheme] = useState<boolean>(false);
  const toggleTheme = () => setLightTheme(previousState => !previousState);
  const theme: ThemeInterface = {
    colors: isLightTheme ? colors.light : colors.dark,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
