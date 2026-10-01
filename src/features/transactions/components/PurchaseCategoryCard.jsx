import { Card } from "../../../shared/components/ui";

export default function PurchaseCategoryCard({
  category,
  onClick,
}) {
  return (
    <Card
      onClick={() => onClick?.(category)}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="text-3xl">
            {category.icon}
          </div>

          <div>
            <h3 className="font-semibold">
              {category.title}
            </h3>

            <p className="text-sm text-gray-500">
              View your transaction history
            </p>
          </div>

        </div>

        <span className="text-xl text-gray-400">
          ›
        </span>

      </div>
    </Card>
  );
}