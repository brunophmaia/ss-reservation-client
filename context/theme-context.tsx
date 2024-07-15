import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({theme: 'dark'});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);