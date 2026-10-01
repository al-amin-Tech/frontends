// src/features/referral/api/referralKeys.js

export const referralKeys = {
  all: ["referral"],

  dashboard: () => [
    ...referralKeys.all,
    "dashboard",
  ],

  withdraw: () => [
    ...referralKeys.all,
    "withdraw",
  ],
};

export default referralKeys;