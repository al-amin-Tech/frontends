// src/features/membership/hooks/useUpgradeAccount.js

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { membershipKeys } from "../api/membershipKeys";
import { membershipApiMap } from "../utils/membershipRouteMap";

export function useUpgradeAccount(role) {
  
  
  
  const upgradeFn = membershipApiMap[role]?.upgrade;

  return useMutation({
    mutationKey: membershipKeys.upgrade(role),

    mutationFn: (payload) => {
      if (!upgradeFn) {
        throw new Error(
          `No upgrade API configured for role: ${role}`
        );
      }

      return upgradeFn(payload);
    },
  });
}

export default useUpgradeAccount;



