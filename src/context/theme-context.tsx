import { createContext, useContext, useState, useEffect } from 'react';

const defaultTheme: string = 'dark';

const ThemeContext = createContext({theme: defaultTheme});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(defaultTheme);

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