
export function parseNaira(value) {
  const amount = Number(value);

  return Number.isFinite(amount) ? amount : 0;
}

export function formatNaira(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Backend fee contract:
 *
 * fixed:
 *   feeValue = "10.00" -> ₦10.00
 *
 * percentage:
 *   feeValue = "1.00" -> 1%
 *   feeValue = "10.00" -> 10%
 *
 * null / zero:
 *   no fee
 */
export function calculateDepositFee(card, amount) {
  const fee = card?.fee;

 
 
  if (!fee || !amount || amount <= 0) {
    return 0;
  }

  const feeValue = parseNaira(fee.feeValue);

  if (feeValue <= 0) {
    return 0;
  }

  if (fee.feeType === "fixed") {
    return feeValue;
  }

  if (fee.feeType === "percentage") {
    return (amount * feeValue) / 100;
  }

  return 0;
}

/**
 * Used when an amount has not yet been entered.
 *
 * fixed:
 *   "10.00" -> "₦10.00"
 *
 * percentage:
 *   "1.00" -> "1%"
 *
 * null / zero:
 *   "No fee"
 */
export function getFeeDescription(card) {
  const fee = card?.fee;

  if (!fee || !fee.feeType) {
    return "No fee";
  }

  const feeValue = parseNaira(fee.feeValue);

  if (feeValue <= 0) {
    return "No fee";
  }

  if (fee.feeType === "fixed") {
    return formatNaira(feeValue);
  }

  if (fee.feeType === "percentage") {
    return `${feeValue}%`;
  }

  return "No fee";
}

export function calculateDepositTotal(card, amount) {
  return amount - calculateDepositFee(card, amount);
}

export function isValidDepositAmount(value) {
  const amount = Number(value);

  return Number.isFinite(amount) && amount > 0;
}










/*



export function parseNaira(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return amount;
}

export function formatNaira(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₦0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate deposit fee.
 *
 * IMPORTANT:
 * The current backend DepositCardService converts feeValueKobo
 * into a Naira string even for percentage configurations.
 *
 * Therefore this currently assumes that a percentage response
 * such as "1.00" means 1%.
 *
 * TODO:
 * Confirm the backend percentage representation and preferably
 * return an explicit percentage value from the API.
 *
export function calculateDepositFee(card, amount) {
  if (!card?.fee) {
    return 0;
  }

  const feeValue = parseNaira(card.fee.feeValue);

  if (!feeValue || amount <= 0) {
    return 0;
  }

  if (card.fee.feeType === "fixed") {
    return feeValue;
  }

  if (card.fee.feeType === "percentage") {
    return (amount * feeValue) / 100;
  }

  return 0;
}

export function calculateDepositTotal(card, amount) {
  const fee = calculateDepositFee(card, amount);

  return amount + fee;
}

export function isValidDepositAmount(value) {
  const amount = Number(value);

  return Number.isFinite(amount) && amount > 0;
}

*/