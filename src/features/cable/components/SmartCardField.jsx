export default function SmartCardField({
  value,
  validation,
  onChange,
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold">
          Smart Card Number
        </h2>

        <p className="text-sm text-gray-500">
          Enter your Smart Card or IUC number.
        </p>

      </div>

      <input
        type="tel"
        inputMode="numeric"
        value={value}
        placeholder="Enter Smart Card Number"
        onChange={(e) =>
          onChange(
            e.target.value.replace(/\D/g, "")
          )
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