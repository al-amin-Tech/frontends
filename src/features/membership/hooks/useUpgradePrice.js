// src/features/membership/hooks/useUpgradePrice.js
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { membershipKeys } from "../api/membershipKeys";
import { membershipApiMap } from "../utils/membershipRouteMap";


export function useUpgradePrice(role) {
  
  const priceFn = membershipApiMap[role]?.price;

  return useQuery({
    queryKey: membershipKeys.price(role),
    queryFn: priceFn,
    enabled: Boolean(role && priceFn),
    staleTime: 5 * 60 * 1000,
  });
}

export default useUpgradePrice;

/*

export function useUpgradePrice(role) {
  useEffect(() => {
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(role, null, 2);
    pre.style.position = "fixed";
    pre.style.bottom = "0";
    pre.style.left = "0";
    pre.style.right = "0";
    pre.style.maxHeight = "40vh";
    pre.style.overflow = "auto";
    pre.style.background = "#000";
    pre.style.color = "#0f0";
    pre.style.zIndex = "99999";

    document.body.appendChild(pre);

    return () => pre.remove();
  }, [role]);

  const priceFn = membershipApiMap[role]?.price;

  return useQuery({
    queryKey: membershipKeys.price(role),
    queryFn: priceFn,
    enabled: Boolean(role && priceFn),
    staleTime: 5 * 60 * 1000,
  });
}
*/