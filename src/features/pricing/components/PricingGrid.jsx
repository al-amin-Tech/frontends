// src/features/pricing/components/PricingGrid.jsx

//import PricingCard from "./PricingCard";

export default function PricingGrid({ items }) {
  if (!items?.length) {
    return (
      <p className="text-center py-4 text-gray-500">
        No data available.
      </p>
    );
  }

  // Determine whether this dataset uses Network or Provider
  const hasNetwork = items.some((item) => item.network);
  const columnTitle = hasNetwork ? "Network" : "Provider";

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full">
      {/*  <thead className="bg-gray-100"> */}
       <thead className="bg-blue-600 text-white">

          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Plan Name</th>
            <th className="px-4 py-3 text-left">{columnTitle}</th>
            <th className="px-4 py-3 text-left">Plan Type</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">
              Discount Percentage
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">{item.id}</td>

              <td className="px-4 py-3 font-medium">
                {item.plan_name}
              </td>

              <td className="px-4 py-3">
                {hasNetwork ? item.network : item.provider}
              </td>

              <td className="px-4 py-3">
                {item.plan_type}
              </td>

              <td className="px-4 py-3 text-right">
                {item.price
                  ? `₦${Number(item.price).toLocaleString()}`
                  : "-"}
              </td>

              <td className="px-4 py-3 text-right">
                {item.percentage
                  ? `${item.percentage}%`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
