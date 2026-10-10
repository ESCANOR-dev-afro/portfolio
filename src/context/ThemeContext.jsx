import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const STORAGE_THEME_KEY = 'escanor_portfolio_theme_v2';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      // 1. Check localStorage preference
      const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      // 2. Check system OS preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
    } catch (e) {
      console.warn('Failed to read theme preference:', e);
    }
    return 'dark';
  });

  // Apply theme to document root (<html class="dark" | "light">)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }

    try {
      localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [theme]);

  // Listen to OS preference changes if no manual preference is pinned
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
      // Only auto-switch if user hasn't explicitly set a preference
      if (!savedTheme) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', isLight: theme === 'light', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      isDark: true,
      isLight: false,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
}
