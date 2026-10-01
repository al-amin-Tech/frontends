// src/features/dashboard/components/WalletCard.jsx

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

export default function WalletCard({
  balance = 0,
}) {
  const [hidden, setHidden] = useState(false);

  return (
    <section
      className="
        rounded-3xl
        bg-blue-400
        p-3
        shadow-lg
      "
    >
      <p className="text-lg font-medium">
        Wallet Balance
      </p>

      <div className="mt-3 flex items-center gap-3">

        <h1 className="text-3xl font-bold">

          {hidden
            ? "••••••••"
            : formatCurrency(balance)}

        </h1>

        <button
          type="button"
          onClick={() => setHidden((v) => !v)}
          className="rounded-full p-2 hover:bg-black/10"
        >
          {hidden
            ? <Eye size={22} />
            : <EyeOff size={22} />}
        </button>

      </div>

    </section>
  );
}