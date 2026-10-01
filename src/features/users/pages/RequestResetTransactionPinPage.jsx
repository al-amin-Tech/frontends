// src/features/users/pages/RequestResetTransactionPinPage.jsx

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../shared/constants/routes";
import {
  Alert,
  Card,
} from "../../../shared/components/ui";
import RequestResetTransactionPinForm from "../components/RequestResetTransactionPinForm";
import { useRequestResetTransactionPin } from "../hooks/useRequestResetTransactionPin";

export default function RequestResetTransactionPinPage() {
  const navigate = useNavigate();

  const requestResetMutation =
    useRequestResetTransactionPin();

  const handleSubmit = useCallback(async () => {
    try {
      await requestResetMutation.mutateAsync();

      await Alert({
        type: "success",
        title: "Verification Code Sent",
        message:
          "Check your email for the verification code.",
      });

      navigate(
        ROUTES.CONFIRM_RESET_TRANSACTION_PIN,
        {
          replace: true,
        }
      );
    } catch (error) {
      await Alert({
        type: "error",
        title: "Request Failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to request PIN reset.",
      });

      requestResetMutation.reset();

      throw error;
    }
  }, [navigate, requestResetMutation]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Reset Transaction PIN
        </h1>

        <p className="mt-2 text-gray-500">
          We'll send a verification code to your
          registered email address. You'll use the
          code to create a new transaction PIN.
        </p>
      </div>

      <Card>
        <RequestResetTransactionPinForm
          mutation={requestResetMutation}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}



