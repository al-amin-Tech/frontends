export const apiKeysKeys = {
  all: ["apiKeys"],

  credentials: (uuid) => [
    ...apiKeysKeys.all,
    "credentials",
    uuid,
  ],
};