export default function calculateEpinTotal({
  amount,
  discount,
  quantity,
}) {
  const unitAmount = Number(amount) || 0;
  const discountPercent = Number(discount) || 0;
  const qty = Number(quantity) || 0;

  if (!unitAmount || !qty) {
    return {
      discountAmount: 0,
      discountedUnitPrice: 0,
      total: 0,
    };
  }

  const discountAmount =
    (unitAmount * discountPercent) / 100;

  const discountedUnitPrice =
    unitAmount - discountAmount;

  const total =
    discountedUnitPrice * qty;

  return {
    discountAmount,
    discountedUnitPrice,
    total,
  };
}