import { useState } from "react";
import {
  Alert,
  Button,
} from "../../../shared/components/ui";
import WalletHistoryList from "../components/WalletHistoryList";
import { useWalletHistory } from "../hooks/useWalletHistory";

const LIMIT = 20;

export default function WalletHistoryPage() {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useWalletHistory({
    page,
    limit: LIMIT,
  });

  const transactions =
    data?.transactions ?? [];

  const hasPrevious = page > 1;

  const hasNext =
    transactions.length >= LIMIT;

  if (error) {
    return (
      <Alert
        type="error"
        title="Unable to Load Wallet History"
        message={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
        }
        actionText="Try Again"
        onAction={refetch}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Wallet History
        </h1>

        <p className="mt-2 text-gray-500">
          View all credits, debits and
          wallet balance changes.
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
        <WalletHistoryList
          transactions={transactions}
        />
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={
            !hasPrevious || isFetching
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
            !hasNext || isFetching
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