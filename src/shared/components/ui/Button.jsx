import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white border-transparent",

  secondary:
    "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",

  danger:
    "bg-red-600 hover:bg-red-700 text-white border-transparent",

  success:
    "bg-green-600 hover:bg-green-700 text-white border-transparent",

  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg",
        "font-medium transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity=".25"
            strokeWidth="4"
          />

          <path
            fill="currentColor"
            d="M22 12a10 10 0 0 0-10-10v4a6 6 0 0 1 6 6h4z"
          />
        </svg>
      )}

      {!loading && leftIcon}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
}