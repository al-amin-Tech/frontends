export default function calculateDiscount(
  amount,
  discountPercent
) {
  const value = Number(amount || 0);

  const percent = Number(discountPercent || 0);

  const discountAmount =
    (value * percent) / 100;

  return {
    amount: value,
    discountPercent: percent,
    discountAmount,
    payable:
      value - discountAmount,
  };
}