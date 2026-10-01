// src/features/notifications/api/notificationKeys.js

export const notificationKeys = {
  all: ["notifications"],

  settings: () => [
    ...notificationKeys.all,
    "settings",
  ],

  updateSettings: () => [
    ...notificationKeys.all,
    "update-settings",
  ],

  support: () => [
    ...notificationKeys.all,
    "support",
  ],
};

export default notificationKeys;