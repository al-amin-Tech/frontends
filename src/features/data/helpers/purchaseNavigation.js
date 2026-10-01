import ROUTES from "@/shared/constants/routes";

export function navigateToReceipt(navigate, data) {
  navigate(ROUTES.PURCHASE_RECEIPT, {
    state: data,
  });
}

export function navigateToSetPin(navigate) {
  navigate(ROUTES.SET_TRANSACTION_PIN);
}