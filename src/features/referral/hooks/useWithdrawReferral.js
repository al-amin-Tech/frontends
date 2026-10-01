// src/features/referral/hooks/useWithdrawReferral.js

import { useMutation } from "@tanstack/react-query";

import { referralApi } from "../api/referralApi";
import { referralKeys } from "../api/referralKeys";

export function useWithdrawReferral() {
  return useMutation({
    mutationKey: referralKeys.withdraw(),

    mutationFn: async () => {
      const response =
        await referralApi.withdraw();

      return response;
    },
  });
}

export default useWithdrawReferral;