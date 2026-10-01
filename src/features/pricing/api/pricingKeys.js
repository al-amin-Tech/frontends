// src/features/pricing/api/pricingKeys.js

export const pricingKeys = {
  all: ["pricing"],

  catalog: () => [
    ...pricingKeys.all,
    "catalog",
  ],
};

export default pricingKeys;