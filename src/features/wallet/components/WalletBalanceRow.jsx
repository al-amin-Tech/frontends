const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

export default function WalletBalanceRow({
  openingBalance,
  closingBalance,
  status,
}) {
  const isReversed = status === "reversed";

  const newBalance = isReversed ? openingBalance : closingBalance;
  const oldBalance = openingBalance;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          New Balance
        </span>

        <span className="font-medium">
          {formatCurrency(newBalance)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Old Balance
        </span>

        <span className="font-semibold">
          {formatCurrency(oldBalance)}
        </span>
      </div>
    </div>
  );
}







/*

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

export default function WalletBalanceRow({
  openingBalance,
  closingBalance,
  status,
}) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          New Balance
         
        </span>

        <span className="font-medium">
          {formatCurrency(closingBalance)}
          
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          
           Old Balance
        </span>

        <span className="font-semibold">
        
        {formatCurrency(openingBalance)}
        </span>
      </div>
    </div>
  );
}



*/