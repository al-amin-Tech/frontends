// src/features/pricing/components/EmptyPricing.jsx

export default function EmptyPricing({
  message = "No pricing available.",
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-gray-200
        bg-white
        p-8
        text-center
      "
    >
      <p className="text-gray-500">
        {message}
      </p>
    </div>
  );
}