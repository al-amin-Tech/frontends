import { useQuery } from "@tanstack/react-query";
import walletApi from "../api/walletApi";
import { walletKeys } from "../api/walletKeys";

export function useWalletHistory({
  page = 1,
  limit = 20,
} = {}) {
  return useQuery({
    queryKey: walletKeys.history(page, limit),

    queryFn: () =>
      walletApi.getHistory({
        page,
        limit,
      }),

    keepPreviousData: true,
  });
}

export default useWalletHistory;