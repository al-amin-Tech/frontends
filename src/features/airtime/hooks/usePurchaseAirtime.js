import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import airtimeKeys from "../api/airtimeKeys";
import { purchase } from "../api/airtimeApi";

export default function usePurchaseAirtime(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await purchase(payload);

      return data;
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: airtimeKeys.all,
      });

      options.onSuccess?.(
        data,
        variables,
        context
      );
    },

    onError(error, variables, context) {
      return options.onError?.(
        error,
        variables,
        context
      );
    },
  });
}









/*


import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import airtimeKeys from "../api/airtimeKeys";
import { purchase } from "../api/airtimeApi";

export default function usePurchaseAirtime(
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await purchase(payload);

      return data;
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: airtimeKeys.all,
      });

      options.onSuccess?.(
        data,
        variables,
        context
      );
    },

    onError(error, variables, context) {
      options.onError?.(
        error,
        variables,
        context
      );
    },
  });
}

*/