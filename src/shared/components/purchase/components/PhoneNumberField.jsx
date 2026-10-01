// src/features/data/components/PhoneNumberField.jsx

export default function PhoneNumberField({
  value,
  onChange,
  validation,
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-lg font-bold">
          Phone Number
        </h2>

      </div>

      <input
        type="tel"
        value={value}
        maxLength={11}
        placeholder="08012345678"
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
            bg-green-50
            border
            border-green-200
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