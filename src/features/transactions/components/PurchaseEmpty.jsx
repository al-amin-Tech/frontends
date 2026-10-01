import { Card } from "../../../shared/components/ui";

export default function PurchaseEmpty() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-5xl">
          🧾
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No Purchase History
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Your purchases will appear here after you
          successfully complete a transaction.
        </p>
      </div>
    </Card>
  );
}