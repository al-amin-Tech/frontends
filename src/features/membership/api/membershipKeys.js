// src/features/membership/api/membershipKeys.js

export const membershipKeys = {
  all: ["membership"],

  prices: () => [
    ...membershipKeys.all,
    "prices",
  ],

  price: (targetRole) => [
    ...membershipKeys.prices(),
    targetRole,
  ],

  upgrade: () => [
    ...membershipKeys.all,
    "upgrade",
  ],
};

export default membershipKeys;