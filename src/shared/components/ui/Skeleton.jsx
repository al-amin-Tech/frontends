import clsx from "clsx";

export default function Skeleton({
  width = "100%",
  height = 20,
  rounded = "rounded-md",
  className = "",
}) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200",
        rounded,
        className
      )}
      style={{
        width,
        height,
      }}
    />
  );
}