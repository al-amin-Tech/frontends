const airtimeKeys = {
  all: ["airtime"],

  planTypes: (network) => [
    ...airtimeKeys.all,
    "plan-types",
    network,
  ],

  plans: (network, planType) => [
    ...airtimeKeys.all,
    "plans",
    network,
    planType,
  ],

  validate: (network, phoneNumber) => [
    ...airtimeKeys.all,
    "validate",
    network,
    phoneNumber,
  ],

  purchase: () => [
    ...airtimeKeys.all,
    "purchase",
  ],
};

export default airtimeKeys;