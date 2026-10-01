// src/features/users/hooks/useUpdateProfile.js

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "../api/userApi";
import { userKeys } from "../api/userKeys";

import { useAuth } from "../../auth/hooks/useAuth";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (payload) => {
      const response =
        await userApi.updateProfile(payload);

      return response?.data?.user;
    },

    onSuccess: (data) => {
      /*
       * Keep AuthContext synchronized.
       */
      if (data) {
        setUser(data);
      }

      /*
       * Refresh profile everywhere.
       */
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(),
      });
    },
  });
}

export default useUpdateProfile;