import { useMutation } from "@tanstack/react-query";

import { validateIuc } from "../api/cableApi";

export default function useValidateIuc() {
  return useMutation({
    mutationFn: validateIuc,
  });
}