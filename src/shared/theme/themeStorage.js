// src/shared/theme/themeStorage.js

import { THEMES } from "./themes";

const STORAGE_KEY = "theme";

export const themeStorage = {
  getTheme() {
    try {
      const value =
        localStorage.getItem(STORAGE_KEY);

      if (
        value === THEMES.LIGHT ||
        value === THEMES.DARK ||
        value === THEMES.SYSTEM
      ) {
        return value;
      }

      return THEMES.SYSTEM;
    } catch {
      return THEMES.SYSTEM;
    }
  },

  setTheme(theme) {
    localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default themeStorage;