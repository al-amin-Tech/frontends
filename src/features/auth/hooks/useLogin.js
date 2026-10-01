// src/features/auth/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { authKeys } from "../api/authKeys";

export const useLogin = () => {
  
  return useMutation({
    mutationKey: authKeys.login(),

    mutationFn: async (loginValues) => {
      const response = await authApi.login(loginValues);

      const data = response.data;
      
      
       // If verification is required, just return the response.
      // No token or auth state should be set.
      if (data?.requireVerification || data?.email) {
        return response?.data;
      }

      // Validate a successful login response.
      if (!data?.access_token || !data?.user) {
        throw new Error("Invalid login response");
      }

      return response.data;
    },

  });
};
