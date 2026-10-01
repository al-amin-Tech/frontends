import DiscountField from "./DiscountField";
import AmountToPayField from "./AmountToPayField";

export default function AirtimeSummary({
  discount,
  payable,
}) {
  return (
    <section className="space-y-4">

      <DiscountField
        value={discount}
      />

      <AmountToPayField
        value={payable}
      />

    </section>
  );
}