// src/features/pricing/hooks/usePricingCatalog.js

import { useQuery } from "@tanstack/react-query";

import pricingApi from "../api/pricingApi";
import pricingKeys from "../api/pricingKeys";

export default function usePricingCatalog() {
  return useQuery({
    queryKey: pricingKeys.catalog(),
    queryFn: pricingApi.getFullCatalog,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
}