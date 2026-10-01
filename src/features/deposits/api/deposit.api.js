import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';
import REQUEST_CONFIG from "../../../shared/api/requestConfig";

/**
 * Fetch all deposit channels available to the authenticated user.
 */
export async function fetchUserDepositCards() {
  const response = await api.get("/deposit-card/my-cards");

  return response.data;
}

/**
 * Generate a reserved virtual account.
 *
 * Placeholder endpoint until the backend endpoint is finalized.
 */
export async function generateDepositAccount(slug) {
  const response = await api.post("/payment-provider/static-accounts/provision", {
    slug,
  });

  return response.data;
}

/**
 * Placeholder for initiating a direct bank/provider deposit.
 *
 * The actual backend/provider integration should return the
 * appropriate redirect/deep-link information.
 */
 
export async function initiateDirectDeposit({ providerSlug, amount }) {
  const endpoint =
    providerSlug === "opay"
      ? "/opay-payment/initiate"
      : "/users/deposits/direct/initiate";

  const response = await api.post(endpoint, {
    providerSlug,
    amount,
  });

  return response.data;
}















