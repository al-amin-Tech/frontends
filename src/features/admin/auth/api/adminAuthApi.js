// src/features/admin/auth/api/adminAuthApi.js
import adminApi from '../../../../shared/api/adminAxios';
import ENDPOINTS from '../../../../shared/api/endpoints';

export const adminAuthApi = {
  login: async (credentials) => {
    const response = await adminApi.post('/auth/login', credentials);
    return response.data;
  },

  verifyTotp: async (otp_code) => {
    

    // Backend route: POST /email/verify-TOTP (as per your router)
    // Middleware will inject the cookie into req.body.verification_token
    const response = await adminApi.post('/auth/email/verify-TOTP', { otp_code });
    return response.data;
  },

  verifyEmailOtp: async (otp_code) => {
    const response = await adminApi.post('/auth/email/verify-otp', { otp_code });
    return response.data;
  },

  completeEmailVerification: async () => {
    const response = await adminApi.post('/auth/email/complete-verification', {});
    return response.data;
  },

  logout: async () => {
    const response = await adminApi.post('/auth/refresh/logout');
    return response.data;
  },
  
  requestPasswordReset: async (email) =>
    (
      await adminApi.post(
        ENDPOINTS.AUTH.PASSWORD.REQUEST_RESET,
        { email }
      )
    ).data,

  verifyPasswordResetOtp: async (otp_code) =>
    (
      await adminApi.post(
        ENDPOINTS.AUTH.PASSWORD.VERIFY_OTP,
        { otp_code }
      )
    ).data,

  completePasswordReset: async (new_password) =>
    (
      await adminApi.post(
        ENDPOINTS.AUTH.PASSWORD.COMPLETE_RESET,
        { new_password }
      )
    ).data,
};



/*

// src/features/admin/auth/api/adminAuthApi.js
// TODO: Adjust path to match your exact project structure
import api from '../../../../shared/api/axios'; // TODO: Adjust to your actual axios instance path

export const adminAuthApi = {
  login: (data) => api.post('/admin/auth/login', data),
  
  // Backend middleware extracts the flow token from the cookie and injects it into req.body
  verifyTotp: (data) => api.post('/admin/auth/email/verify-TOTP', data), 
  
  verifyEmailOtp: (data) => api.post('/admin/auth/email/verify-otp', data),
  
  completeEmailVerification: () => api.post('/admin/auth/email/complete-verification', {}),
  
  refresh: () => api.post('/admin/auth/refresh/token', {}),
  
  logout: () => api.post('/admin/auth/refresh/logout', {}),
};
*/