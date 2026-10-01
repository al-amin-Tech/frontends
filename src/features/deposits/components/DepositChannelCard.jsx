import { ArrowUpRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../shared/constants/routes";

export default function DepositChannelCard({ card, onSelect }) {
  const navigate = useNavigate();

  function handleSelect() {
    navigate(ROUTES.DEPOSIT_AMOUNT, {
      state: {
        card,
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.99] hover:border-gray-200"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        <Building2 className="h-6 w-6 text-gray-700" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-900">
          {card.bankName}
        </p>

        {card.displayName &&
          card.displayName !== card.bankName && (
            <p className="mt-0.5 text-xs text-gray-500">
              {card.displayName}
            </p>
          )}
      </div>

      <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400" />
    </button>
  );
}












/*
import { ArrowUpRight, Building2 } from "lucide-react";

export default function DepositChannelCard({ card, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(card)}
      className="flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.99] hover:border-gray-200"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        <Building2 className="h-6 w-6 text-gray-700" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-900">
          {card.bankName}
        </p>

        {card.displayName &&
          card.displayName !== card.bankName && (
            <p className="mt-0.5 text-xs text-gray-500">
              {card.displayName}
            </p>
          )}
      </div>

      <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400" />
    </button>
  );
}
*/