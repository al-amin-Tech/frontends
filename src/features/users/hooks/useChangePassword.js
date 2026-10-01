// src/features/users/hooks/useChangePassword.js

import { useMutation } from "@tanstack/react-query";

import { userApi } from "../api/userApi";

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload) => {
      const response =
        await userApi.changePassword(payload);

      return response.data;
    },
  });
}

export default useChangePassword;