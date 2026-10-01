import { useMutation } from "@tanstack/react-query";

import { purchaseEdupin } from "../api/educationApi";

export default function usePurchaseEdupin(
  options = {}
) {
  return useMutation({
    mutationFn: purchaseEdupin,
    ...options,
  });
}