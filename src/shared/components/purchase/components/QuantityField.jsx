import { Plus, Minus } from "lucide-react";

export default function QuantityField({
  value,
  onChange,
  min = 1,
  max = 100,
  label = "Quantity",
}) {
  const quantity = Number(value) || 1;

  function decrease() {
    const next = Math.max(min, quantity - 1);
    onChange(String(next));
  }

  function increase() {
    const next = Math.min(max, quantity + 1);
    onChange(String(next));
  }

  function handleChange(event) {
    const raw = event.target.value;

    if (raw === "") {
      onChange("");
      return;
    }

    const numeric = raw.replace(/\D/g, "");

    if (!numeric) {
      onChange("");
      return;
    }

    const parsed = Number(numeric);

    if (parsed > max) {
      onChange(String(max));
      return;
    }

    onChange(String(parsed));
  }

  return (
    <div className="space-y-2">
      <label className="font-medium">
        {label}
      </label>

      <div
        className="
          flex
          items-center
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
        "
      >
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= min}
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            text-gray-600
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Minus size={20} />
        </button>

        <input
          type="tel"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          className="
            h-14
            min-w-0
            flex-1
            border-x
            border-gray-100
            bg-transparent
            px-4
            text-center
            text-lg
            font-semibold
            outline-none
          "
        />

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            text-gray-600
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Plus size={20} />
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Minimum {min} · Maximum {max}
      </p>
    </div>
  );
}