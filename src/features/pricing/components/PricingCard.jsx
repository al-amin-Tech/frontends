// src/features/pricing/components/PricingCard.jsx

export default function PricingCard({
  title,
  subtitle,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="space-y-2">

        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        {subtitle && (
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        )}

        <p className="pt-2 text-xl font-bold text-blue-600">
          {value}
        </p>

      </div>
    </div>
  );
}