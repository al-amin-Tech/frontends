// src/features/users/pages/TransactionPinPage.jsx

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Card,
} from "../../../shared/components/ui";

import ROUTES from "../../../shared/constants/routes";
import TransactionPinForm from "../components/TransactionPinForm";
import { useSetTransactionPin } from "../hooks/useSetTransactionPin";

export default function TransactionPinPage() {
  const navigate = useNavigate();

  const setPinMutation =
    useSetTransactionPin();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await setPinMutation.mutateAsync(values);

        await Alert({
          type: "success",
          title: "Transaction PIN Created",
          message:
            "Your transaction PIN has been created successfully.",
        });
      } catch (error) {
        await Alert({
          type: "error",
          title: "Unable to Set PIN",
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Unable to set your transaction PIN.",
        });

        setPinMutation.reset();

        throw error;
      }
    },
    [setPinMutation]
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Transaction PIN
        </h1>

        <p className="mt-2 text-gray-500">
          Create a secure 4-digit transaction PIN.
          This PIN will be required whenever you
          authorize purchases, wallet debits and
          other sensitive operations.
        </p>
      </div>


      <Card>
        <TransactionPinForm
          mutation={setPinMutation}
          onSubmit={handleSubmit}
        />
      </Card>

      <div className="text-center">
        <button
          type="button"
          onClick={() =>
            navigate(
              ROUTES.REQUEST_RESET_TRANSACTION_PIN
            )
          }
          className="
            text-sm
            font-medium
            text-blue-600
            hover:underline
          "
        >
          Forgot your Transaction PIN?
        </button>
      </div>
    </div>
  );
}

