// src/features/users/hooks/useProfile.js

import { useQuery } from "@tanstack/react-query";

import { userApi } from "../api/userApi";
import { userKeys } from "../api/userKeys";

import { useAuth } from "../../auth/hooks/useAuth";

export function useProfile(options = {}) {
  const { isAuthenticated, setUser } = useAuth();

  return useQuery({
    queryKey: userKeys.profile(),

    queryFn: async () => {
      const response = await userApi.getProfile();

      const data = response?.data;

      // Keep AuthContext synchronized with the latest user profile.
      if (data?.user) {
        setUser(data.user);
      }

      return data;
    },

    enabled: isAuthenticated,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    ...options,
  });
}

export default useProfile;