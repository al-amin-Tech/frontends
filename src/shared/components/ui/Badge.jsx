import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-100 text-blue-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-800",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-cyan-100 text-cyan-700",

  gray:
    "bg-gray-100 text-gray-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",

  md: "px-2.5 py-1 text-sm",

  lg: "px-3 py-1.5 text-base",
};

export default function Badge({
  children,
  variant = "gray",
  size = "md",
  rounded = true,
  className = "",
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center font-medium",
        rounded ? "rounded-full" : "rounded-md",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}