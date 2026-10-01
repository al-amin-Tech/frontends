// src/features/data/hooks/usePlanTypes.js

import { useQuery } from "@tanstack/react-query";

import dataApi from "../api/dataApi";
import dataKeys from "../api/dataKeys";

export default function usePlanTypes(
  network
) {
  return useQuery({
    queryKey: dataKeys.planTypes(
      network
    ),

    queryFn: () =>
      dataApi.getPlanTypes(network),

    enabled: !!network,

    staleTime:
      1000 * 60 * 30,
  });
}