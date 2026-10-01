// src/features/data/api/dataKeys.js

export const dataKeys = {
  all: ["data"],

  planTypes: (network) => [
    ...dataKeys.all,
    "plan-types",
    network,
  ],

  plans: (network, planType) => [
    ...dataKeys.all,
    "plans",
    network,
    planType,
  ],
};

export default dataKeys;