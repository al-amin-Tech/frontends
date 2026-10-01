import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";

import purchaseCategories from "../utils/purchaseCategories";
import PurchaseCategoryList from "../components/PurchaseCategoryList";

export default function PurchaseCategoriesPage() {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (category) => {
      navigate(
        ROUTES.PURCHASE_HISTORY.replace(
          ":category",
          category.id
        )
      );
    },
    [navigate]
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-24">

      <div>
        <h1 className="text-2xl font-bold">
          Purchase History
        </h1>

        <p className="mt-2 text-gray-500">
          Select a purchase category to
          view your previous transactions.
        </p>
      </div>

      <PurchaseCategoryList
        categories={purchaseCategories}
        onSelect={handleSelect}
      />

    </div>
  );
}