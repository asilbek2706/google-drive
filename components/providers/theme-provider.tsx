'use client';

import React from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme, enableSystem: boolean) {
  if (typeof document === 'undefined') {
    return;
  }

  const resolvedTheme =
    theme === 'system' && enableSystem ? getSystemTheme() : theme;

  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystem = true,
  storageKey = 'theme',
  attribute,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    return storedTheme ?? defaultTheme;
  });
  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' && enableSystem
      ? getSystemTheme()
      : theme === 'dark'
        ? 'dark'
        : 'light';

  React.useEffect(() => {
    applyTheme(theme, enableSystem);
    window.localStorage.setItem(storageKey, theme);
  }, [theme, enableSystem, storageKey]);

  React.useEffect(() => {
    if (attribute !== 'class' || !disableTransitionOnChange) {
      return;
    }

    const style = document.createElement('style');
    style.textContent = '*{transition:none !important}';
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [attribute, disableTransitionOnChange]);

  React.useEffect(() => {
    if (!enableSystem || theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system', true);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystem, theme]);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: setThemeState,
    }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
