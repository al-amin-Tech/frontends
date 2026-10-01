// AmountField.jsx

export default function AmountField({
  label = 'Amount',
  amount,
}) {
  return (
    <div className="space-y-2">

      <label className="font-medium">
        {label}
      </label>

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-4
          text-lg
          font-bold
          text-blue-600
        "
      >
        {amount || "Select a plan"}
      </div>

    </div>
  );
}