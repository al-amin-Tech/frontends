import PurchaseCard from "./PurchaseCard";
import PurchaseEmpty from "./PurchaseEmpty";

export default function PurchaseList({
  purchases = [],
  onSelect,
}) {
  if (!purchases.length) {
    return <PurchaseEmpty />;
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase.reference}
          purchase={purchase}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}