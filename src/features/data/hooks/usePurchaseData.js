// src/features/data/hooks/usePurchaseData.js

import { useMutation } from "@tanstack/react-query";

import dataApi from "../api/dataApi";

export default function usePurchaseData(options = {}) {
  return useMutation({
    mutationFn: dataApi.purchase,
    ...options,
  });
}
