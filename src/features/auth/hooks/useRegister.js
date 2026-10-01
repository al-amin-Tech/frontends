import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/authApi";

/**
 * Register a new user.
 *
 * Backend:
 * POST /auth/register
 *
 * Returns:
 * {
 *   success: true,
 *   message: "...",
 *   data: {...}
 * }
 */
export function useRegister(options = {}) {
  return useMutation({
    mutationFn: authApi.register,

    ...options,
  });
}

export default useRegister;