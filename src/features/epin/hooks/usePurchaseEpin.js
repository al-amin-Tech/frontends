import { useMutation } from "@tanstack/react-query";
import { purchaseEpin } from "../api/epinApi";

export default function usePurchaseEpin(options = {}) {
  return useMutation({
    mutationFn: purchaseEpin,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
}