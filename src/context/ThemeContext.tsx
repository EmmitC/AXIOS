import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Language } from '../types';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('axios-apparel-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load language from localStorage
    const savedLanguage = localStorage.getItem('axios-apparel-language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('axios-apparel-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('axios-apparel-language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      language,
      toggleTheme,
      setLanguage
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};