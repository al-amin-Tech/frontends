

import { Building2, Loader2, ReceiptText } from "lucide-react";

import { Alert } from "../../../shared/components/ui";
import { getFeeDescription } from "../utils/deposit.utils";
import { useGenerateDepositAccount } from "../hooks/useGenerateDepositAccount";

export default function GenerateAccountCard({ card }) {
  const generateMutation = useGenerateDepositAccount();

  async function handleGenerate() {
    try {
      const response = await generateMutation.mutateAsync(
        card.providerSlug
      );

      Alert({
        type: "success",
        title: "Account Generation Successful",
        message:
          response?.message ??
          "Your reserved account number has been generated.",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to generate your account number.";

      Alert({
        type: "error",
        title: "Account Generation Failed",
        message,
      });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
          <Building2 className="h-6 w-6 text-gray-700" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900">
            {card.displayName || card.bankName}
          </h3>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            Get your dedicated virtual account and use it to fund
            your wallet directly from any bank.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <ReceiptText className="h-4 w-4 text-gray-400" />

          <span className="text-sm text-gray-500">
            Deposit Fee
          </span>
        </div>

        <span className="text-sm font-semibold text-gray-900">
          {getFeeDescription(card)}
        </span>
      </div>

      <button
        type="button"
        disabled={generateMutation.isPending}
        onClick={handleGenerate}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {generateMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {generateMutation.isPending
          ? "Generating..."
          : "Generate Account Number"}
      </button>
    </div>
  );
}












/*


import { Building2, Loader2 } from "lucide-react";
import { useGenerateDepositAccount } from "../hooks/useGenerateDepositAccount";
import { Alert } from "../../../shared/components/ui";

export default function GenerateAccountCard({ card }) {
  const generateMutation = useGenerateDepositAccount();

  async function handleGenerate() {
    try {
      const response = await generateMutation.mutateAsync(
        card.providerSlug
      );

      Alert({
        type: "success",
        title: "Account Generation Successful",
        message:
          response?.message ??
          "Your reserved account number has been generated.",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to generate your account number.";

      Alert({
        type: "error",
        title: "Account Generation Failed",
        message,
      });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
          <Building2 className="h-6 w-6 text-gray-700" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900">
            {card.displayName || card.bankName}
          </h3>

          <p className="mt-1 text-sm leading-5 text-gray-500">
            Get your dedicated virtual account and use it to fund your
            wallet directly from any bank.
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={generateMutation.isPending}
        onClick={handleGenerate}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {generateMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}

        {generateMutation.isPending
          ? "Generating..."
          : "Generate Account Number"}
      </button>
    </div>
  );
}

*/