
import { useQuery } from "@tanstack/react-query";
import purchaseApi from "../api/purchaseApi";
import { purchaseKeys } from "../api/purchaseKeys";

export function usePurchaseHistory({
  category = 'airtime',
  page = 1,
  limit = 20,
}) {
  
  return useQuery({
    queryKey: purchaseKeys.history(
      category,
      page,
      limit
    ),
 
    queryFn: () =>
      purchaseApi.getHistory({
        category,
        page,
        limit,
      }),
    
    enabled: Boolean(category),

    keepPreviousData: true,
  });
}

export default usePurchaseHistory;

