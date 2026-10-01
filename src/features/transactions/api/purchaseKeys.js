export const purchaseKeys = {
  all: ["purchase-transactions"],

  history: (category, page, limit) => [
    ...purchaseKeys.all,
    "history",
    category,
    page,
    limit,
  ],

  details: (reference) => [
    ...purchaseKeys.all,
    "details",
    reference,
  ],
};

export default purchaseKeys;