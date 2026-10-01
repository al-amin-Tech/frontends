// src/features/auth/hooks/useVerifyEmailOtp.js
import { useMutation } from '@tanstack/react-query';
import { adminAuthApi } from '../api/adminAuthApi';

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: (otp_code) => adminAuthApi.verifyEmailOtp(otp_code),
  });
};