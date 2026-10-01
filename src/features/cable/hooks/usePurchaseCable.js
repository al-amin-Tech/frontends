import { useMutation } from "@tanstack/react-query";

import { purchaseCable } from "../api/cableApi";

export default function usePurchaseCable(
  options = {}
) {
  return useMutation({
    mutationFn: purchaseCable,
    ...options,
  });
}