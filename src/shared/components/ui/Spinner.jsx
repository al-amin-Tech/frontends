import clsx from "clsx";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-10 w-10 border-4",
};

export default function Spinner({
  size = "md",
  className = "",
}) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        "inline-block animate-spin rounded-full",
        "border-current border-t-transparent",
        sizes[size],
        className
      )}
    >
      <span className="sr-only">
        Loading...
      </span>
    </div>
  );
}