// src/shared/theme/ThemeProvider.jsx

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import ThemeContext from "./ThemeContext";

import {
  THEMES,
} from "./themes";

import themeStorage
  from "./themeStorage";

function getSystemTheme() {
  if (
    typeof window === "undefined" ||
    !window.matchMedia
  ) {
    return THEMES.LIGHT;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

function applyTheme(theme) {
  const html =
    document.documentElement;

  html.classList.remove("light");
  html.classList.remove("dark");

  html.classList.add(theme);

  html.setAttribute(
    "data-theme",
    theme
  );
}

export function ThemeProvider({
  children,
}) {
  const [theme, setThemeState] =
    useState(
      themeStorage.getTheme
    );

  const [
    systemTheme,
    setSystemTheme,
  ] = useState(getSystemTheme);

  /**
   * Listen for OS theme changes
   */
  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const listener = (
      event
    ) => {
      setSystemTheme(
        event.matches
          ? THEMES.DARK
          : THEMES.LIGHT
      );
    };

    if (
      media.addEventListener
    ) {
      media.addEventListener(
        "change",
        listener
      );
    } else {
      media.addListener(
        listener
      );
    }

    return () => {
      if (
        media.removeEventListener
      ) {
        media.removeEventListener(
          "change",
          listener
        );
      } else {
        media.removeListener(
          listener
        );
      }
    };
  }, []);

  /**
   * Actual theme being used
   */
  const resolvedTheme =
    theme === THEMES.SYSTEM
      ? systemTheme
      : theme;

  /**
   * Apply theme
   */
  useEffect(() => {
    applyTheme(
      resolvedTheme
    );
  }, [resolvedTheme]);

  /**
   * Change theme
   */
  const setTheme = useCallback((newTheme) => {

        themeStorage.setTheme(
          newTheme
        );
        setThemeState(
          newTheme
        );
      },
      []
    );

  const value = useMemo(
    () => ({
      theme,

      resolvedTheme,

      systemTheme,

      setTheme,
    }),
    [
      theme,
      resolvedTheme,
      systemTheme,
      setTheme,
    ]
  );

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;


/*


const setTheme = useCallback((newTheme) => {
  alert(`Setting theme to: ${newTheme}`);

  themeStorage.setTheme(newTheme);
  setThemeState(newTheme);
}, []);

*/