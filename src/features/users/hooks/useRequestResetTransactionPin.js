// src/features/users/hooks/useRequestResetTransactionPin.js

import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/userApi";

export function useRequestResetTransactionPin() {
  return useMutation({
    mutationFn: async () => {
      const response =
        await userApi.requestResetTransactionPin();

      return response.data;
    },
  });
}

export default useRequestResetTransactionPin;