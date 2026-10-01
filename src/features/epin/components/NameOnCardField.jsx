export default function NameOnCardField({
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <label className="font-medium">
        Name on Card
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Enter name to appear on card"
        maxLength={100}
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-4
          py-4
          outline-none
          focus:border-blue-500
        "
      />
    </div>
  );
}