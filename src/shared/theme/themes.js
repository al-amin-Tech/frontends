// src/shared/theme/themes.js

export const THEMES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
});

export const THEME_OPTIONS = [
  {
    id: THEMES.LIGHT,
    title: "Light",
    description:
      "Always use the light appearance.",
  },

  {
    id: THEMES.DARK,
    title: "Dark",
    description:
      "Always use the dark appearance.",
  },

  {
    id: THEMES.SYSTEM,
    title: "System",
    description:
      "Follow your device theme automatically.",
  },
];