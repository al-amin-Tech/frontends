import { Card } from "../../../shared/components/ui";
import WalletAmount from "./WalletAmount";
import WalletBalanceRow from "./WalletBalanceRow";
import WalletReference from "./WalletReference";
import WalletStatusBadge from "./WalletStatusBadge";
import { getWalletCategory } from "../utils/walletCategory";

export default function WalletHistoryCard({
  transaction,
}) {
  const category = getWalletCategory(
    transaction.category
  );

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            {category.icon}
          </div>

          <div>
            <h3 className="font-semibold">
              {category.label}
            </h3>

            {transaction.description && (
              <p className="mt-1 text-sm text-gray-500">
                {transaction.description}
              </p>
            )}
          </div>
        </div>

        <WalletAmount
          amount={transaction.amount}
          type={transaction.type}
          status={transaction.status}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <WalletStatusBadge
          status={transaction.status}
        />

        <span className="text-sm text-gray-500">
          {new Date(
            transaction.created_at
          ).toLocaleString()}
        </span>
      </div>

      <WalletBalanceRow
        openingBalance={
          transaction.opening_balance
        }
        closingBalance={
          transaction.closing_balance
        }
        status={transaction.status}
      />

      <WalletReference
        reference={transaction.reference}
      />
    </Card>
  );
}




/*
import { Card } from "../../../shared/components/ui";
import WalletAmount from "./WalletAmount";
import WalletStatusBadge from "./WalletStatusBadge";
import { getWalletCategory } from "../utils/walletCategory";

export default function WalletHistoryCard({
  transaction,
  onClick,
}) {
  const category = getWalletCategory(
    transaction.category
  );

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => onClick?.(transaction)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {category.icon}
            </span>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">
                {category.label}
              </h3>

              <p className="mt-1 truncate text-xs text-gray-500">
                {transaction.reference}
              </p>
            </div>
          </div>

          {transaction.description && (
            <p className="mt-3 text-sm text-gray-600">
              {transaction.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <WalletStatusBadge
              status={transaction.status}
            />

            <span className="text-xs text-gray-500">
              {new Date(
                transaction.created_at
              ).toLocaleString()}
            </span>
          </div>
        </div>

        <WalletAmount
          amount={transaction.amount}
          type={transaction.type}
        />
      </div>
    </Card>
  );
}*/