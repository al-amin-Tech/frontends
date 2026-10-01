export default function ReceiptRow({
  label,
  value,
  children,
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3 border-b border-gray-100 dark:border-gray-800">

      <span className="text-sm text-gray-500">
        {label}
      </span>

      <div className="text-right">

        {children ?? (
          <span className="font-medium break-all">
            {value ?? "-"}
          </span>
        )}

      </div>

    </div>
  );
}