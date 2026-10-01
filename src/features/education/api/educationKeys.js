export const educationKeys = {
  all: ["education"],

  plans: (provider) => [
    ...educationKeys.all,
    "plans",
    provider,
  ],
};