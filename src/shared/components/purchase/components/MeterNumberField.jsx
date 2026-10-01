export default function MeterNumberField({
  value,
  onChange,
  validation,
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold">
          Meter Number
        </h2>

      </div>

      <input
        type="text"
        value={value}
        maxLength={20}
        placeholder="12345678901"
        onChange={(e) =>
          onChange(e.target.value)
        }
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

      {validation && (
        <div
          className="
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-3
          "
        >
          <p className="text-yellow-700 text-sm">
            {validation.message}
          </p>
        </div>
      )}

    </section>
  );
}