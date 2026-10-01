const electricityKeys = {
  all: ["electricity"],

  plans: () => [
    ...electricityKeys.all,
    "plans",
  ],

  validateMeter: (
    meterNumber,
    provider,
    meterType
  ) => [
    ...electricityKeys.all,
    "validate-meter",
    meterNumber,
    provider,
    meterType,
  ],

  purchase: () => [
    ...electricityKeys.all,
    "purchase",
  ],
};

export default electricityKeys;