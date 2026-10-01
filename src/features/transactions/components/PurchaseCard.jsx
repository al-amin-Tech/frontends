import { Card } from "../../../shared/components/ui";
import PurchaseStatusBadge from "./PurchaseStatusBadge";
import  formatAmount  from "../utils/formatAmount";

export default function PurchaseCard({
  purchase,
  onClick,
}) {
  return (
    <Card
      onClick={() => onClick?.(purchase)}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-sm text-gray-500">
            Amount
          </span>

          <span className="font-semibold">
            {formatAmount(purchase.amount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500">
            Provider
          </span>

          <span>
            {purchase.network.toUpperCase()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Status
          </span>

          <PurchaseStatusBadge
            status={purchase.status}
          />
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500">
            Time
          </span>

          <span>
            {new Date(
              purchase.created_at
            ).toLocaleDateString()}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Reference
          </p>

          <p className="mt-1 break-all font-mono text-sm">
            {purchase.reference}
          </p>
        </div>

      </div>
    </Card>
  );
}

