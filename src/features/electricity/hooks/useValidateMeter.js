import { useMutation } from "@tanstack/react-query";

import { validateMeter } from "../api/electricityApi";

export default function useValidateMeter() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } =
        await validateMeter(payload);

      return data.data ?? data;
    },
  });
}