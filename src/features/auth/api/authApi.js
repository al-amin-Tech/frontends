// src/features/auth/api/authApi.js
/*
import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';

export const authApi = Object.freeze({
  register: async (payload) =>
    (await api.post(ENDPOINTS.AUTH.REGISTER, payload)).data,

  login: async (payload) =>
    (await api.post(ENDPOINTS.AUTH.LOGIN, payload)).data,

  logout: async () =>
    (await api.post(ENDPOINTS.AUTH.LOGOUT)).data,

  verifyEmailOtp: async (otp_code) =>
    (
      await api.post(ENDPOINTS.AUTH.EMAIL.VERIFY_OTP, {
        otp_code,
      })
    ).data,

  completeEmailVerification: async () =>
    (
      await api.post(
        ENDPOINTS.AUTH.EMAIL.COMPLETE_VERIFICATION
      )
    ).data,

  requestPasswordReset: async (email) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.REQUEST_RESET,
        { email }
      )
    ).data,

  verifyPasswordResetOtp: async (otp_code) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.VERIFY_OTP,
        { otp_code }
      )
    ).data,

  completePasswordReset: async (new_password) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.COMPLETE_RESET,
        { new_password }
      )
    ).data,
});
*/

// src/features/auth/api/authApi.js
import api from '../../../shared/api/axios';
import ENDPOINTS from '../../../shared/api/endpoints';

export const authApi = Object.freeze({
  register: async (payload) => {
    alert(JSON.stringify(payload, null, 2));

    return (await api.post(
      ENDPOINTS.AUTH.REGISTER,
      payload
    )).data;
  },

  login: async (payload) =>
    (await api.post(ENDPOINTS.AUTH.LOGIN, payload)).data,

  logout: async () =>
    (await api.post(ENDPOINTS.AUTH.LOGOUT)).data,

  verifyEmailOtp: async (otp_code) =>
    (
      await api.post(ENDPOINTS.AUTH.EMAIL.VERIFY_OTP, {
        otp_code,
      })
    ).data,

  completeEmailVerification: async () =>
    (
      await api.post(
        ENDPOINTS.AUTH.EMAIL.COMPLETE_VERIFICATION
      )
    ).data,

  requestPasswordReset: async (email) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.REQUEST_RESET,
        { email }
      )
    ).data,

  verifyPasswordResetOtp: async (otp_code) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.VERIFY_OTP,
        { otp_code }
      )
    ).data,

  completePasswordReset: async (new_password) =>
    (
      await api.post(
        ENDPOINTS.AUTH.PASSWORD.COMPLETE_RESET,
        { new_password }
      )
    ).data,
});
