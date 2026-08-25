import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useTheme must be used inside CategoryProvider');

  return context;
}

export default useTheme;
