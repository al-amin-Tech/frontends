// src/shared/components/purchase/PurchaseButton.jsx

export default function PurchaseButton({
  disabled,
  loading,
  onClick,
  children = "Continue",
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className="
        w-full
        rounded-2xl
        bg-blue-600
        py-4
        font-semibold
        text-white
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading ? "Loading..." : children}
    </button>
  );
}