
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Loader2,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../../../shared/components/ui";
import ROUTES from "../../../shared/constants/routes";

import {
  calculateDepositFee,
  calculateDepositTotal,
  formatNaira,
  isValidDepositAmount,
} from "../utils/deposit.utils";

import { initiateDirectDeposit } from "../api/deposit.api";

const MAX_DEPOSIT_AMOUNT = 50000;

function onBack() {
  navigate(ROUTES.DEPOSIT);
}

export default function EnterAmountScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const card = location.state?.card;

    if (!card) {
     navigate(ROUTES.DEPOSIT);
     return null;
    }
    
  
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericAmount = Number(amount);

  const fee = useMemo(() => {
    if (!isValidDepositAmount(amount)) {
      return 0;
    }

    return calculateDepositFee(card, numericAmount);
  }, [card, amount, numericAmount]);

  const total = useMemo(() => {
    if (!isValidDepositAmount(amount)) {
      return 0;
    }

    return calculateDepositTotal(card, numericAmount);
  }, [card, amount, numericAmount]);

  const isValid =
    isValidDepositAmount(amount) &&
    numericAmount <= MAX_DEPOSIT_AMOUNT;

  function handleAmountChange(event) {
    const value = event.target.value;

    // Only allow positive numeric Naira values
    // with a maximum of 2 decimal places.
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      const numericValue = Number(value);

      if (numericValue > MAX_DEPOSIT_AMOUNT) {
        Alert({
          type: "error",
          title: "Amount Limit Exceeded",
          message: "Amount to enter is ₦50,000 or less.",
        });

        return;
      }

      setAmount(value);
    }
  }

  async function handleNext() {
    // Protect against double/multiple submission.
    if (isSubmitting) {
      return;
    }

    if (!isValid) {
      Alert({
        type: "error",
        title: "Invalid Amount",
        message:
          numericAmount > MAX_DEPOSIT_AMOUNT
            ? "Amount to enter is ₦50,000 or less."
            : "Enter a valid amount greater than ₦0.",
      });

      return;
    }

    // Final maximum-amount check immediately before
    // starting the deposit request.
    if (numericAmount > MAX_DEPOSIT_AMOUNT) {
      Alert({
        type: "error",
        title: "Amount Limit Exceeded",
        message: "Amount to enter is ₦50,000 or less.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const response = await initiateDirectDeposit({
        providerSlug: card.providerSlug,
        amount: numericAmount,
      });

      /*
       * Placeholder:
       *
       * Backend should ideally return something like:
       *
       * {
       *   checkoutUrl: "...",
       *   deepLink: "..."
       * }
       *
       * The application can then use the appropriate banking
       * redirect/deep-link mechanism.
       */

      const redirectUrl =
        response?.checkoutUrl ??
        response?.redirectUrl ??
        response?.redirect;

      if (!redirectUrl) {
        Alert({
          type: "error",
          title: "Deposit Failed",
          message:
            response?.message ??
            "Unable to start the bank deposit flow.",
        });

        return;
      }

      window.location.href = redirectUrl;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to start the deposit.";

      Alert({
        type: "error",
        title: "Deposit Failed",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>

          <span className="ml-2 font-semibold text-gray-900">
            Enter Amount
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-8 pt-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Building2 className="h-6 w-6 text-gray-700" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Deposit with
              </p>

              <h1 className="font-semibold text-gray-900">
                {card.bankName}
              </h1>

              {card.displayName &&
                card.displayName !== card.bankName && (
                  <p className="text-xs text-gray-500">
                    {card.displayName}
                  </p>
                )}
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="deposit-amount"
              className="text-sm font-medium text-gray-700"
            >
              Amount
            </label>

            <div className="mt-2 flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 focus-within:border-gray-900 focus-within:bg-white">
              <span className="text-2xl font-semibold text-gray-500">
                ₦
              </span>

              <input
                id="deposit-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-transparent px-3 py-4 text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Amount</span>

              <span className="font-medium text-gray-900">
                {formatNaira(
                  isValid ? numericAmount : 0
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Fee</span>

              <span className="font-medium text-gray-900">
                {formatNaira(fee)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="font-semibold text-gray-900">
                Amount To Receive
              </span>

              <span className="text-lg font-bold text-gray-900">
                {formatNaira(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={handleNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}














/*



import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Loader2,
} from "lucide-react";

import { Alert } from "../../../shared/components/ui";

import {
  calculateDepositFee,
  calculateDepositTotal,
  formatNaira,
  isValidDepositAmount,
} from "../utils/deposit.utils";

import { initiateDirectDeposit } from "../api/deposit.api";

export default function EnterAmountScreen({ card, onBack }) {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericAmount = Number(amount);

  const fee = useMemo(() => {
    if (!isValidDepositAmount(amount)) {
      return 0;
    }

    return calculateDepositFee(card, numericAmount);
  }, [card, amount, numericAmount]);

  const total = useMemo(() => {
    if (!isValidDepositAmount(amount)) {
      return 0;
    }

    return calculateDepositTotal(card, numericAmount);
  }, [card, amount, numericAmount]);

  const isValid = isValidDepositAmount(amount);

  function handleAmountChange(event) {
    const value = event.target.value;

    // Only allow positive numeric Naira values.
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  }

  async function handleNext() {
    if (!isValid) {
      Alert({
        type: "error",
        title: "Invalid Amount",
        message: "Enter a valid amount greater than ₦0.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const response = await initiateDirectDeposit({
        providerSlug: card.providerSlug,
        amount: numericAmount,
      });

      /*
       * Placeholder:
       *
       * Backend should ideally return something like:
       *
       * {
       *   redirectUrl: "...",
       *   deepLink: "..."
       * }
       *
       * The application can then use the appropriate banking
       * redirect/deep-link mechanism.
       *

      const redirectUrl =
        response?.deepLink ??
        response?.redirectUrl ??
        response?.redirect;

      if (!redirectUrl) {
        Alert({
          type: "error",
          title: "Deposit Failed",
          message:
            response?.message ??
            "Unable to start the bank deposit flow.",
        });

        return;
      }

      window.location.href = redirectUrl;
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to start the deposit.";

      Alert({
        type: "error",
        title: "Deposit Failed",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>

          <span className="ml-2 font-semibold text-gray-900">
            Enter Amount
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-8 pt-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Building2 className="h-6 w-6 text-gray-700" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Deposit with
              </p>

              <h1 className="font-semibold text-gray-900">
                {card.bankName}
              </h1>

              {card.displayName &&
                card.displayName !== card.bankName && (
                  <p className="text-xs text-gray-500">
                    {card.displayName}
                  </p>
                )}
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="deposit-amount"
              className="text-sm font-medium text-gray-700"
            >
              Amount
            </label>

            <div className="mt-2 flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 focus-within:border-gray-900 focus-within:bg-white">
              <span className="text-2xl font-semibold text-gray-500">
                ₦
              </span>

              <input
                id="deposit-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-transparent px-3 py-4 text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium text-gray-900">
                {formatNaira(
                  isValid ? numericAmount : 0
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Fee</span>
              <span className="font-medium text-gray-900">
                {formatNaira(fee)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="font-semibold text-gray-900">
               Amount To Receive
              </span>

              <span className="text-lg font-bold text-gray-900">
                {formatNaira(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={!isValid || isSubmitting}
            onClick={handleNext}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
*/


