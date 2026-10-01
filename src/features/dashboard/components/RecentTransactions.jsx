// src/features/dashboard/components/RecentTransactions.jsx

import { ChevronRight } from "lucide-react";

export default function RecentTransactions({
  transactions = [],
  onViewAll,
}) {
  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="
            flex
            items-center
            gap-1
            text-sm
            font-medium
            text-blue-600
          "
        >
          View All

          <ChevronRight size={16} />

        </button>

      </div>

      {transactions.length === 0 ? (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            p-8
            text-center
            text-gray-500
          "
        >
          No recent transactions.
        </div>

      ) : (

        <div className="space-y-3">

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-white
                p-4
                shadow-sm
              "
            >
              <div>

                <h3 className="font-semibold">
                  {transaction.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {transaction.date}
                </p>

              </div>

              <div
                className={`font-bold ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "credit"
                  ? "+"
                  : "-"}
                ₦{transaction.amount}
              </div>

            </div>
          ))}

        </div>

      )}

    </section>
  );
}