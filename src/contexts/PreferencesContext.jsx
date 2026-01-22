// src/contexts/PreferencesContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';

const PreferencesContext = createContext();
const THEME_KEY = 'transaksiku_theme';

const loadTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored || 'light';
};

export const PreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const setThemeValue = (value) => setTheme(value === 'dark' ? 'dark' : 'light');

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        toggleTheme,
        setThemeValue,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
};
