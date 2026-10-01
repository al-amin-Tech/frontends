import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateDepositAccount } from "../api/deposit.api";

export function useGenerateDepositAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateDepositAccount,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["deposit-cards"],
      });
    },
  });
}