import { useState } from "react";
import {
  Building2,
  Check,
  Copy,
  CreditCard,
  ReceiptText,
  User,
} from "lucide-react";

import { Alert } from "../../../shared/components/ui";
import { getFeeDescription } from "../utils/deposit.utils";

export default function DepositAccountCard({ card }) {
  const [copied, setCopied] = useState(false);

  const account = card?.account;

  async function handleCopy() {
    if (!account?.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(account.accountNumber);

      setCopied(true);

      Alert({
        type: "success",
        title: "Account Number Copied",
        message: "The account number has been copied to your clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      Alert({
        type: "error",
        title: "Copy Failed",
        message: "Unable to copy the account number.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
          <Building2 className="h-5 w-5 text-gray-700" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-500">
            Reserved Virtual Account
          </p>

          <h3 className="truncate font-semibold text-gray-900">
            {account?.bankName || card?.bankName || "Bank Account"}
          </h3>
        </div>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-xs text-gray-500">
          Account Number
        </p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xl font-bold tracking-wide text-gray-900">
            {account?.accountNumber || "—"}
          </p>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!account?.accountNumber}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Copy account number"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <Copy className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-4 w-4 text-gray-400" />

          <div className="min-w-0">
            <p className="text-xs text-gray-500">
              Account Name
            </p>

            <p className="text-sm font-medium text-gray-900">
              {account?.accountName || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-4 w-4 text-gray-400" />

          <div className="min-w-0">
            <p className="text-xs text-gray-500">
              Reference
            </p>

            <p className="break-all text-sm font-medium text-gray-900">
              {account?.reference || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ReceiptText className="mt-0.5 h-4 w-4 text-gray-400" />

          <div className="min-w-0">
            <p className="text-xs text-gray-500">
              Deposit Fee
            </p>

            <p className="text-sm font-medium text-gray-900">
              {getFeeDescription(card)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}














/*
import { useState } from "react";
import {
  Building2,
  Check,
  Copy,
  CreditCard,
  User,
} from "lucide-react";

import { Alert } from "../../../shared/components/ui";

export default function DepositAccountCard({ card }) {
  const [copied, setCopied] = useState(false);

  const account = card.account;

  async function handleCopy() {
    if (!account?.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(account.accountNumber);

      setCopied(true);

      Alert({
        type: "success",
        title: "Account Number Copied",
        message: "The account number has been copied to your clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      Alert({
        type: "error",
        title: "Copy Failed",
        message: "Unable to copy the account number.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
          <Building2 className="h-5 w-5 text-gray-700" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-500">
            Reserved Virtual Account
          </p>

          <h3 className="truncate font-semibold text-gray-900">
            {account?.bankName || card.bankName}
          </h3>
        </div>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-xs text-gray-500">Account Number</p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xl font-bold tracking-wide text-gray-900">
            {account?.accountNumber}
          </p>

          <button
            type="button"
            onClick={handleCopy}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
            aria-label="Copy account number"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <Copy className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-3">
          <User className="mt-0.5 h-4 w-4 text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Account Name</p>
            <p className="text-sm font-medium text-gray-900">
              {account?.accountName || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-4 w-4 text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Reference</p>
            <p className="break-all text-sm font-medium text-gray-900">
              {account?.reference || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

*/