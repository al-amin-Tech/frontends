const cableKeys = {
  all: ["cable"],

  plans: (provider) => [
    ...cableKeys.all,
    "plans",
    provider,
  ],

  validate: (provider, smartCardNumber) => [
    ...cableKeys.all,
    "validate",
    provider,
    smartCardNumber,
  ],
};

export default cableKeys;