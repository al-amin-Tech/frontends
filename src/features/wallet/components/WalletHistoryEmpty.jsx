import { Card } from "../../../shared/components/ui";

export default function WalletHistoryEmpty() {
  return (
    <Card>
      <div className="py-12 text-center">
        <div className="text-5xl">
          💳
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No Wallet Transactions
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Your wallet transaction history
          will appear here after you start
          using your wallet.
        </p>
      </div>
    </Card>
  );
}