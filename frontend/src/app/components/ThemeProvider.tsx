import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function getSystemPreference(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemPreference();
  return theme;
}

// Determine theme and apply class synchronously, before first render
function initTheme(): Theme {
  try {
    // Migrate old key if it exists
    const oldSaved = localStorage.getItem("theme");
    if (oldSaved === "dark" || oldSaved === "light") {
      localStorage.setItem("zentrix-theme", oldSaved);
      localStorage.removeItem("theme");
    }

    const saved = localStorage.getItem("zentrix-theme") as Theme | null;
    const theme: Theme =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system"; // default to system

    // Apply the class immediately (synchronous, before first paint)
    const resolved = theme === "system" ? getSystemPreference() : theme;
    applyTheme(resolved);

    return theme;
  } catch {
    return "system";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => initTheme());

  const resolvedTheme = getResolvedTheme(theme);

  // Re-apply class whenever theme state changes (handles toggling)
  useEffect(() => {
    applyTheme(getResolvedTheme(theme));
  }, [theme]);

  // Listen for OS preference changes (only relevant in system mode)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme(mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("zentrix-theme", newTheme);
    applyTheme(getResolvedTheme(newTheme));
  };

  const toggleTheme = () => {
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
