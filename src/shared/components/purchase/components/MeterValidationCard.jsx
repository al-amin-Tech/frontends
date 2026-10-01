export default function MeterValidationCard({
  customer,
}) {
  if (!customer) {
    return null;
  }

  return (
    <div
      className="
        space-y-4
        rounded-2xl
        border
        border-green-200
        bg-green-50
        p-5
      "
    >

      <div>

        <h3 className="font-bold text-green-700">
          Customer Information
        </h3>

      </div>

      <div className="space-y-3">

        <InfoRow
          label="Customer"
          value={
            customer.customer_name
          }
        />

        <InfoRow
          label="Address"
          value={
            customer.address
          }
        />

        <InfoRow
          label="Meter"
          value={
            customer.meter_number
          }
        />

      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {value || "-"}
      </span>

    </div>
  );
}