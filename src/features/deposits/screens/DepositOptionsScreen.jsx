import {
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  WalletCards,
} from "lucide-react";

import { useDepositCards } from "../hooks/useDepositCards";
import DepositAccountCard from "../components/DepositAccountCard";
import GenerateAccountCard from "../components/GenerateAccountCard";
import DepositChannelCard from "../components/DepositChannelCard";
import DepositSection from "../components/DepositSection";

function DepositSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5"
        >
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-48 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-5 h-12 rounded-xl bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function DepositOptionsScreen({ onBack, onSelectChannel }) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useDepositCards();
  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DepositHeader onBack={onBack} />

        <main className="mx-auto max-w-lg px-4 pb-8 pt-5">
          <DepositSkeleton />
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DepositHeader onBack={onBack} />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-sm text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>

            <h2 className="mt-4 font-semibold text-gray-900">
              Unable to load deposit options
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Something went wrong while loading your funding options.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isFetching ? "animate-spin" : ""
                }`}
              />

              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  const cards = data?.data?.cards ?? [];

  if (!cards.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DepositHeader onBack={onBack} />

        <main className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <WalletCards className="h-7 w-7 text-gray-500" />
            </div>

            <h2 className="mt-4 font-semibold text-gray-900">
              No deposit options available
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              There are currently no wallet funding options available
              for your account.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /*
   * IMPORTANT:
   *
   * We intentionally use ONLY card.uiState to decide which
   * component gets rendered.
   */
  const accountCards = cards.filter(
    (card) => card.uiState === "ACCOUNT_DETAILS"
  );

  const generateCards = cards.filter(
    (card) => card.uiState === "GENERATE_ACCOUNT_NUMBER"
  );

  const directCards = cards.filter(
    (card) => card.uiState === "ENTER_AMOUNT_THEN_REDIRECT"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DepositHeader onBack={onBack} />

      <main className="mx-auto max-w-lg space-y-7 px-4 pb-10 pt-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Fund Wallet
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Choose how you want to add money to your wallet.
          </p>
        </div>

        {accountCards.length > 0 && (
          <DepositSection title="Virtual Account">
            {accountCards.map((card) => (
              <DepositAccountCard
                key={`${card.providerSlug}-${card.uiState}`}
                card={card}
              />
            ))}
          </DepositSection>
        )}

        {generateCards.length > 0 && (
          <DepositSection title="Virtual Account">
            {generateCards.map((card) => (
              <GenerateAccountCard
                key={`${card.providerSlug}-${card.uiState}`}
                card={card}
              />
            ))}
          </DepositSection>
        )}

        {directCards.length > 0 && (
          <DepositSection title="Direct Bank Deposit">
            {directCards.map((card) => (
              <DepositChannelCard
                key={`${card.providerSlug}-${card.uiState}`}
                card={card}
                onSelect={onSelectChannel}
              />
            ))}
          </DepositSection>
        )}
      </main>
    </div>
  );
}

function DepositHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center px-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <span className="ml-2 font-semibold text-gray-900">
          Deposit
        </span>
      </div>
    </header>
  );
}