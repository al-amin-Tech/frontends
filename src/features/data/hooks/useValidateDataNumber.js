// src/features/data/hooks/useValidateDataNumber.js

import { useMutation } from "@tanstack/react-query";

import dataApi from "../api/dataApi";

export default function useValidateDataNumber() {
  return useMutation({
    mutationFn:
      dataApi.validateNumber,
  });
}