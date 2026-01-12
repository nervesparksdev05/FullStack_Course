import { createContext, useEffect, useMemo, useState } from "react";
import { getInitialTheme } from "./theme.utils.js";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
