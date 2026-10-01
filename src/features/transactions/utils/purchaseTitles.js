const PURCHASE_TITLES = {
  data: "Data Purchases",
  airtime: "Airtime Purchases",
  cable: "Cable TV Purchases",
  electricity: "Electricity Purchases",
  edu_pin: "Education PIN Purchases",
  e_pin: "E-PIN Purchases",
};

export function getPurchaseTitle(category) {
  return (
    PURCHASE_TITLES[category] ??
    "Purchase History"
  );
}

export default getPurchaseTitle;