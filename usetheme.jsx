import { useEffect, useState } from 'react';

const useTheme = () => {
  // Initialize theme state based on localStorage or system preference
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Apply dark or light class based on the theme state
    const applyTheme = (currentTheme) => {
      const isDark = currentTheme === 'dark';
      root.classList.toggle('dark', isDark);
    };

    applyTheme(theme);

    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [theme]);

  // Update the theme and store it only if it is 'dark' or 'light'
  const handleThemeChange = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme'); // Remove the stored theme to follow system
    }
    setTheme(newTheme);
  };

  return { theme, handleThemeChange };
};

export default useTheme;
