// src/features/auth/hooks/useVerifyPasswordResetOtp.js
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useVerifyPasswordResetOtp = () => {
  return useMutation({
    mutationFn: (otp_code) => adminAuthApi.verifyPasswordResetOtp(otp_code),
  });
};