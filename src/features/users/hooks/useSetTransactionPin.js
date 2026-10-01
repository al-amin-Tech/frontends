// src/features/users/hooks/useSetTransactionPin.js

import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/userApi";

export function useSetTransactionPin() {
  return useMutation({
    mutationFn: async (payload) => {
      const response =
        await userApi.setTransactionPin(payload);

      return response.data;
    },
  });
}

export default useSetTransactionPin;