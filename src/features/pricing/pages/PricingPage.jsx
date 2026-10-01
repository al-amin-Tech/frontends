// src/features/pricing/pages/PricingPage.jsx

//import PageHeader from "../../../shared/components/PageHeader";

import usePricingCatalog from "../hooks/usePricingCatalog";

import PricingSection from "../components/PricingSection";

export default function PricingPage() {
  const {
    data,
    isPending,
    isError,
  } = usePricingCatalog();

  if (isPending) {
    return (
      <div className="space-y-6">

        {/*<PageHeader
          title="Pricing"
          subtitle="Current pricing catalogue."
        />
      */}
        <p className="text-gray-500">
          Loading...
        </p>

      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">

        <PageHeader
          title="Pricing"
          subtitle="Current pricing catalogue."
        />

        <p className="text-red-500">
          Failed to load pricing.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

     {/* <PageHeader
        title="Pricing"
        subtitle="Browse all available prices and discounts."
      /> */}

      <PricingSection
        title="Data"
        items={data?.data}
      />

      <PricingSection
        title="Airtime"
        items={data?.airtime}
      />

      <PricingSection
        title="Cable TV"
        items={data?.cable}
      />

      <PricingSection
        title="Electricity"
        items={data?.electricity}
      />

      <PricingSection
        title="Education"
        items={data?.edupin}
      />

      <PricingSection
        title="Recharge PIN"
        items={data?.epin}
      />

    </div>
  );
}