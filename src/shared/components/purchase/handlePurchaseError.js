//import ROUTES from "../../../shared/constants/routes";

import ROUTES from "../../../shared/constants/routes";
import Alert from "../../../shared/components/ui/Alert"; // adjust the path
/*
export default function handlePurchaseError({
  category,
  error,
  navigate,
  closeModal,
  setError,
}) {
  const response = error ?? {};

  const code = response.code;
  const message =
    response.message ?? "Purchase failed.";

  switch (code) {
    case "TRANSACTIONS_NOT_SET":
      Alert({
        type: "error",
        title: "Purchase Failed",
        message,
      }).then(() => {
        closeModal?.();
        navigate(ROUTES.TRANSACTION_PIN);
      });
      return;

    case "TRANSACTIONS_PROCESSING":
      Alert({
        type: "error",
        title: "Purchase Failed",
        message,
      }).then(() => {
        closeModal?.();

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            category
          ),
          {
            state: {
              status: "processing",
              message,
            },
          }
        );
      });
      return;
      
      case "TRANSACTIONS_REVERSED":
      Alert({
        type: "error",
        title: "Purchase reversed",
        message,
      }).then(() => {
        closeModal?.();

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            category
          ),
          {
            state: {
              status: "reversed",
              message,
            },
          }
        );
      });
      return;
      
      case "TRANSACTIONS_REVERSED_FAIL":
      Alert({
        type: "error",
        title: "Purchase fail",
        message,
      }).then(() => {
        closeModal?.();
        navigate(
          ROUTES.CONTACT_US );
      });
      
      return;
      case "INSUFFICIENT_BALANCE":
      Alert({
        type: "error",
        title: "Purchase fail",
        message,
      }).then(() => {
        closeModal?.();
        navigate(
          ROUTES.FUND_WALLET
        );
      });
      return;
      
    default:
      // Keep the existing behaviour for normal errors
      setError(message);
  }
}
*/

export default function handlePurchaseError({
  category,
  error,
  navigate,
  closeModal,
  setError,
  resetPurchaseFlow,
}) {
  const response = error ?? {};

  const code = response.code;
  const message =
    response.message ?? "Purchase failed.";

  switch (code) {

    case "TRANSACTIONS_NOT_SET":
      Alert({
        type: "error",
        title: "Purchase Failed",
        message,
      }).then(() => {
        closeModal?.();
        navigate(ROUTES.TRANSACTION_PIN);
      });
      return;

    case "TRANSACTIONS_PROCESSING":
      Alert({
        type: "error",
        title: "Purchase Failed",
        message,
      }).then(() => {
        closeModal?.();

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            category
          ),
          {
            state: {
              status: "processing",
              message,
            },
          }
        );
      });
      return;

    case "INSUFFICIENT_BALANCE":
      Alert({
        type: "error",
        title: "Purchase Failed",
        message,
      }).then(() => {
        closeModal?.();
        navigate(ROUTES.FUND_WALLET);
      });
      return;

    default:
      resetPurchaseFlow?.();
      setError(message);
  }
}
