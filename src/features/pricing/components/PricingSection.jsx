// src/features/pricing/components/PricingSection.jsx

import EmptyPricing from "./EmptyPricing";
import PricingGrid from "./PricingGrid";

export default function PricingSection({
  title,
  items = [],
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          Current pricing.
        </p>

      </div>

      {items.length ? (
        <PricingGrid items={items} />
      ) : (
        <EmptyPricing />
      )}

    </section>
  );
}