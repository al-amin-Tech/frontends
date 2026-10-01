// src/features/referral/hooks/useReferralDashboard.js

import { useQuery } from "@tanstack/react-query";

import { referralApi } from "../api/referralApi";
import { referralKeys } from "../api/referralKeys";

export function useReferralDashboard() {
  return useQuery({
    queryKey: referralKeys.dashboard(),

    queryFn: async () => {
      const response =
        await referralApi.getDashboard();

      return response?.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}

export default useReferralDashboard;
