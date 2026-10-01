// src/features/settings/api/settingsKeys.js

export const settingsKeys = {
  all: ["settings"],

  app: () => [
    ...settingsKeys.all,
    "app",
  ],

  support: () => [
    ...settingsKeys.app(),
    "support",
  ],

  developer: () => [
    ...settingsKeys.app(),
    "developer",
  ],

  legal: () => [
    ...settingsKeys.app(),
    "legal",
  ],
};

export default settingsKeys;