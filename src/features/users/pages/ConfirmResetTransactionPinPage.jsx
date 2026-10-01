// src/features/users/pages/ConfirmResetTransactionPinPage.jsx

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../shared/constants/routes";
import {
  Alert,
  Card,
} from "../../../shared/components/ui";

import ConfirmResetTransactionPinForm from "../components/ConfirmResetTransactionPinForm";

import { useConfirmResetTransactionPin } from "../hooks/useConfirmResetTransactionPin";

export default function ConfirmResetTransactionPinPage() {
  const navigate = useNavigate();

  const confirmResetMutation =
    useConfirmResetTransactionPin();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await confirmResetMutation.mutateAsync(
          values
        );

        await Alert({
          type: "success",
          title: "Transaction PIN Reset",
          message:
            "Your transaction PIN has been reset successfully.",
        });

        navigate(
          ROUTES.PROFILE,
          {
            replace: true,
          }
        );
      } catch (error) {
        await Alert({
          type: "error",
          title: "Reset Failed",
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Unable to reset transaction PIN.",
        });

        confirmResetMutation.reset();

        throw error;
      }
    },
    [
      navigate,
      confirmResetMutation,
    ]
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-24">

      <div>

        <h1 className="text-2xl font-bold">
          Create New Transaction PIN
        </h1>

        <p className="mt-2 text-gray-500">
          Enter the verification code sent to your
          email together with your new 4-digit
          transaction PIN.
        </p>

      </div>

      <Card>

        <ConfirmResetTransactionPinForm
          mutation={confirmResetMutation}
          onSubmit={handleSubmit}
        />

      </Card>

    </div>
  );
}
