export default function CustomerInfoCard({
  customer,
}) {
  if (!customer) return null;

  return (
    <section
      className="
        rounded-2xl
        border
        border-green-200
        bg-green-50
        p-5
      "
    >
      <h2 className="mb-4 text-lg font-bold text-green-800">
        Customer Information
      </h2>

      <div className="space-y-3">

        {customer?.customer_name && (
          <InfoRow
            label="Customer"
            value={customer?.customer_name}
          />
        )}

        {customer?.customerName && (
          <InfoRow
            label="Customer"
            value={customer?.customerName}
          />
        )}

        {customer?.name && (
          <InfoRow
            label="Customer"
            value={customer?.name}
          />
        )}

        {customer?.smartCardNumber && (
          <InfoRow
            label="Smart Card"
            value={customer?.smartCardNumber}
          />
        )}

        {customer?.iuc && (
          <InfoRow
            label="Smart Card"
            value={customer.iuc}
          />
        )}

        {customer?.plan && (
          <InfoRow
            label="Current Package"
            value={customer?.plan}
          />
        )}

        {customer?.balance && (
          <InfoRow
            label="Balance"
            value={customer?.balance}
          />
        )}

        {customer?.dueDate && (
          <InfoRow
            label="Due Date"
            value={customer?.dueDate}
          />
        )}

        {customer?.status && (
          <InfoRow
            label="Status"
            value={customer?.status}
          />
        )}

      </div>

    </section>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between gap-4">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {String(value) || "-"}
      </span>

    </div>
  );
}