import { createContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(
    function () {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    },
    [theme],
  );

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
