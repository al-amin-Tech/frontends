import clsx from "clsx";

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount));

export default function WalletAmount({
  amount,
  type,
  status,
}) {
  const isCredit =
    String(type).toLowerCase() === "credit";

  const isReversedDebit =
    String(type).toLowerCase() === "debit" &&
    String(status).toLowerCase() === "reversed";

  return (
    <span
      className={clsx(
        "text-base font-semibold",
        isReversedDebit
          ? "text-black"
          : isCredit
          ? "text-green-600"
          : "text-red-600"
      )}
    >
      {isReversedDebit ? "" : isCredit ? "+" : "-"}
      {formatCurrency(amount)}
    </span>
  );
}

















/*
import clsx from "clsx";

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Number(amount));

export default function WalletAmount({
  amount,
  type,
  status,
}) {
  const isCredit =
    String(type).toLowerCase() === "credit";

  return (
    <span
      className={clsx(
        "text-base font-semibold",
        isCredit
          ? "text-green-600"
          : "text-red-600"
      )}
    >
      {isCredit ? "+" : "-"}
      {formatCurrency(amount)}
    </span>
  );
}


*/









