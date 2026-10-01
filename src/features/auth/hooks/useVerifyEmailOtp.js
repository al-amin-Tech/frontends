// src/features/auth/hooks/useVerifyEmailOtp.js
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useVerifyEmailOtp = () => {
  return useMutation({
    mutationFn: (otp_code) => authApi.verifyEmailOtp(otp_code),
  });
};