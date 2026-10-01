// src/features/auth/hooks/useVerifyPasswordResetOtp.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useVerifyPasswordResetOtp = () => {
  return useMutation({
    mutationFn: (otp_code) => authApi.verifyPasswordResetOtp(otp_code),
  });
};