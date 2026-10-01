// src/features/referral/components/ReferralProgress.jsx
import  formatAmount  from "../utils/formatAmount";

function parseAmount(value) {
  const amount = Number(value ?? 0);

  return Number.isNaN(amount) ? 0 : amount;
}


export default function ReferralProgress({
  totalSpent,
  spendRequired,
}) {
  const spent = parseAmount(totalSpent);
  const required = parseAmount(spendRequired);

  const percentage =
    required <= 0
      ? 100
      : Math.min(
          (spent / required) * 100,
          100
        );

  const remaining = Math.max(
    required - spent,
    0
  );

  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between text-sm">

        <span className="font-medium">
          Progress
        </span>

        <span className="font-semibold text-blue-600">
          {percentage.toFixed(0)}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-200">

        <div
          className="
            h-full
            rounded-full
            bg-blue-600
            transition-all
            duration-500
          "
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="flex justify-between text-sm text-gray-600">

        <span>
          {formatAmount(spent)}
        </span>

        <span>
          {formatAmount(required)}
        </span>

      </div>

      {remaining > 0 && (
        <p className="text-sm font-medium text-orange-600">
          Remaining:{" "}
          {formatAmount(remaining)}
        </p>
      )}

      {remaining === 0 && (
        <p className="text-sm font-medium text-green-600">
          Spending requirement completed
        </p>
      )}

    </div>
  );
}