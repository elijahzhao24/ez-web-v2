"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { theme } from "./theme";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentTheme: typeof theme.light | typeof theme.dark;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
  currentTheme: theme.dark,
});

function applyThemeVariables(currentTheme: typeof theme.light | typeof theme.dark) {
  const root = document.documentElement;

  root.style.setProperty("--background", currentTheme.bg.primary);
  root.style.setProperty("--surface", currentTheme.bg.secondary);
  root.style.setProperty("--surface-strong", currentTheme.bg.tertiary);
  root.style.setProperty("--foreground", currentTheme.text.primary);
  root.style.setProperty("--muted", currentTheme.text.secondary);
  root.style.setProperty("--muted-2", currentTheme.text.tertiary);
  root.style.setProperty("--accent", currentTheme.accent);
  root.style.setProperty("--primary", currentTheme.primary);
  root.style.setProperty("--secondary", currentTheme.secondary);
  root.style.setProperty("--border", currentTheme.border.primary);
  root.style.setProperty("--border-strong", currentTheme.border.secondary);
  root.style.setProperty("--nav-bg", currentTheme.nav.bg);
  root.style.setProperty("--nav-bubble", currentTheme.nav.bubble);
  root.style.setProperty("--nav-text", currentTheme.nav.text);
  root.style.setProperty("--nav-text-hover", currentTheme.nav.textHover);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    applyThemeVariables(currentTheme);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [currentTheme, isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((value) => !value);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
