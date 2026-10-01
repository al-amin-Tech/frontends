import PurchaseCategoryCard from "./PurchaseCategoryCard";

export default function PurchaseCategoryList({
  categories,
  onSelect,
}) {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <PurchaseCategoryCard
          key={category.id}
          category={category}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}