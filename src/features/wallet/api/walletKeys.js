// src/features/wallet/api/walletKeys.js

export const walletKeys = {
  all: ["wallet"],

  history: (page, limit) => [
    ...walletKeys.all,
    "history",
    page,
    limit,
  ],
};

export default walletKeys;