// src/features/users/hooks/useConfirmResetTransactionPin.js

import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/userApi";

export function useConfirmResetTransactionPin() {
  return useMutation({
    mutationFn: async (payload) => {
      const response =
        await userApi.confirmResetTransactionPin(
          payload
        );

      return response.data;
    },
  });
}

export default useConfirmResetTransactionPin;