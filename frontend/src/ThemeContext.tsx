import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the context value
interface ThemeContextType {
  theme: 'Light' | 'Dark';
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  // Initialize theme from localStorage, default to 'Light' if not set
  const [theme, setTheme] = useState<'Light' | 'Dark'>(
    () => (localStorage.getItem('theme') as 'Light' | 'Dark') || 'Light'
  );

  useEffect(() => {
    // Save the current theme to localStorage whenever it changes
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'Light' ? 'Dark' : 'Light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
