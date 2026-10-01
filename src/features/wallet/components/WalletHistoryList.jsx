import WalletHistoryCard from "./WalletHistoryCard";
import WalletHistoryEmpty from "./WalletHistoryEmpty";

export default function WalletHistoryList({
  transactions = [],
}) {
  if (!transactions.length) {
    return <WalletHistoryEmpty />;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <WalletHistoryCard
          key={transaction.reference}
          transaction={transaction}
        />
      ))}
    </div>
  );
}