export default function EpinAmountField({
  value,
  onChange,
}) {
  const amounts = [100, 200, 500, 1000];

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold">
          PIN Amount
        </h2>

        <p className="text-sm text-gray-500">
          Select the value of each recharge PIN.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {amounts.map((amount) => {
          const selected =
            String(value) === String(amount);

          return (
            <button
              key={amount}
              type="button"
              onClick={() => onChange(String(amount))}
              className={`
                rounded-2xl
                border
                p-4
                text-left
                transition

                ${
                  selected
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <p className="text-lg font-bold">
                ₦{amount.toLocaleString()}
              </p>

              <p className="text-xs text-gray-500">
                Recharge PIN
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}