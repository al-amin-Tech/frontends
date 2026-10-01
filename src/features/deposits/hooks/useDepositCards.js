import { useQuery } from "@tanstack/react-query";
import { fetchUserDepositCards } from "../api/deposit.api";

export function useDepositCards() {
  return useQuery({
    queryKey: ["deposit-cards"],
    queryFn: fetchUserDepositCards,
    staleTime: 30_000,
  });
}