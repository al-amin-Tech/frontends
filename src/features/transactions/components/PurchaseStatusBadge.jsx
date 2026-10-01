import clsx from "clsx";

const STATUS = {
  success: {
    label: "Success",
    className:
      "bg-green-100 text-green-700 border-green-200",
  },

  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
  },

  failed: {
    label: "Failed",
    className:
      "bg-red-100 text-red-700 border-red-200",
  },

  reversed: {
    label: "Reversed",
    className:
      "bg-blue-100 text-blue-700 border-blue-200",
  },
  
  processing: {
    label: "processing",
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
};

export default function PurchaseStatusBadge({
  status,
}) {
  const variant =
    STATUS[
      String(status).toLowerCase()
    ] ?? {
      label: status,
      className:
        "bg-gray-100 text-gray-700 border-gray-200",
    };

  return (
    <span
      className={clsx(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
        variant.className
      )}
    >
      {variant.label}
    </span>
  );
}