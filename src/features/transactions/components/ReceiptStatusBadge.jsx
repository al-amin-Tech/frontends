const STATUS_STYLES = {
  success:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

  failed:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

  reversed:
    "bg-blue-100 text-blue-700 border-blue-200",
    
  processing:
    "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function ReceiptStatusBadge({
  status,
}) {
  const normalized =
    String(status || "").toLowerCase();

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
        STATUS_STYLES[normalized] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}