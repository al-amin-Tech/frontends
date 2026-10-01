import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getPurchaseTitle from "../utils/purchaseTitles";
import {
  Alert,
  Button,
} from "../../../shared/components/ui";

import ROUTES from "../../../shared/constants/routes";
import PurchaseList from "../components/PurchaseList";
import { usePurchaseHistory } from "../hooks/usePurchaseHistory";

const LIMIT = 20;

export default function PurchaseHistoryPage() {
  
  const navigate = useNavigate();

  const { category } = useParams();
  
  const title = getPurchaseTitle(category);

  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = usePurchaseHistory({
    category,
    page,
    limit: LIMIT,
  });

  const handleSelect = useCallback(
    (purchase) => {
      navigate(
        ROUTES.PURCHASE_DETAILS.replace(
          ":reference",
          purchase.reference
        )
      );
    },
    [navigate]
  );

  if (error) {
    return (
      <Alert
        type="error"
        title="Unable to Load Purchases"
        message={
          error?.response?.data?.message ||
          error?.message
        }
        actionText="Retry"
        onAction={refetch}
      />
    );
  }

  const purchases = data?.logs ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          Review all your completed and
          previous purchases.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl bg-gray-100"
              />
            )
          )}
        </div>
      ) : (
        <PurchaseList
          purchases={purchases}
          onSelect={handleSelect}
        />
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={
            page === 1 || isFetching
          }
          onClick={() =>
            setPage((previous) =>
              previous - 1
            )
          }
        >
          Previous
        </Button>

        <span className="text-sm text-gray-500">
          Page {page}
        </span>

        <Button
          variant="outline"
          disabled={
            purchases.length < LIMIT ||
            isFetching
          }
          onClick={() =>
            setPage((previous) =>
              previous + 1
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}