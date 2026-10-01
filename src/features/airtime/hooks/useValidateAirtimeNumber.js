import { useMutation } from "@tanstack/react-query";
import { validateNumber } from "../api/airtimeApi";

export default function useValidateAirtimeNumber() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } =
        await validateNumber(payload);

      return data?.data ?? data;
    },
  });
}