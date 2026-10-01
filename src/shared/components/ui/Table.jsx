import clsx from "clsx";

export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  rowKey = "id",
  striped = true,
  hover = true,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "overflow-x-auto rounded-xl border border-gray-200 bg-white",
        className
      )}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  "px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600",
                  column.className
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row[rowKey]}
                className={clsx(
                  striped &&
                    index % 2 !== 0 &&
                    "bg-gray-50",
                  hover &&
                    "transition hover:bg-blue-50"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={clsx(
                      "whitespace-nowrap px-6 py-4 text-sm text-gray-700",
                      column.cellClassName
                    )}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}