export default function AmountToPayField({
  label = "Amount To Pay",
  value,
}) {
  return (
    <div className="space-y-2">

      <label className="font-medium">
        {label}
      </label>

      <input
        readOnly
        value={value}
        className="
  w-full
  rounded-xl
  border
  border-blue-600
  p-4
  bg-blue-50
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500

        "
      />

    </div>
  );
}