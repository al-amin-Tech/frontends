import { useQuery } from "@tanstack/react-query";
import purchaseApi from "../api/purchaseApi";
import { purchaseKeys } from "../api/purchaseKeys";

export function usePurchaseDetails(reference) {
  return useQuery({
    queryKey: purchaseKeys.details(reference),

    queryFn: () =>
      purchaseApi.getDetails(reference),

    enabled: Boolean(reference),
  });
}

export default usePurchaseDetails;