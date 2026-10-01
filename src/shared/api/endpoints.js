// src/shared/api/endpoints.js
const ENDPOINTS = Object.freeze({
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/refresh/logout",

    EMAIL: {
      VERIFY_OTP: "/auth/email/verify-otp",
      COMPLETE_VERIFICATION: "/auth/email/complete-verification",
    },

    PASSWORD: {
      REQUEST_RESET: "/auth/password/request-reset",
      VERIFY_OTP: "/auth/password/verify-otp",
      COMPLETE_RESET: "/auth/password/complete-reset",
    },
  },

  USER: {
    PROFILE: "/users/me",
    UPDATE_PROFILE: "/users/me",
    UPDATE_PASSWORD: "/users/change-password",
    TRANSACTION_PIN: "/users/set-pin",
    REQUEST_RESET_TRANSACTION_PIN: "/users/reset-pin/request",
    CONFIRM_RESET_TRANSACTION_PIN: "/users/reset-pin/confirm",
    GET_VENDOR_PRICE: "/membership/upgrade/vendor",
    GET_API_PRICE: "/membership/upgrade/api-user",
    GET_AGENT_PRICE: "/membership/upgrade/agent",
    UPGRADE_VENDOR: "/membership/upgrade/vendor",
    UPGRADE_API: "/membership/upgrade/api-user",
    UPGRADE_AGENT: "/membership/upgrade/agent",
  },
  
   SETTINGS: {
      CONTACT: "/usersplatform-settings/get",
     },
     
  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products",
    DATA_PURCHASE: "/products/data",
    AIRTIME_PURCHASE: "/products/airtime",
    ELECTRICITY_PURCHASE: "/products/electricity",
    CABLE_PURCHASE: "/products/cable",
    EDUCATION_PURCHASE: "/products/edu_pin",
    RECHAGE_PIN_PURCHASE: "/products/e_pin",
    
  },
  
  PURCHASE: {
    DATA_PURCHASE: "/purchase/data",
    AIRTIME_PURCHASE: "/purchase/airtime",
    ELECTRICITY_PURCHASE: "/purchase/electricity",
    CABLE_PURCHASE: "/purchase/cable",
    EDUCATION_PURCHASE: "/purchase/edu_pin",
    RECHAGE_PIN_PURCHASE: "/purchase/e_pin",
  },
  
  VALIDATION: {
    DATA_PURCHASE: "/provider/data",
    AIRTIME_PURCHASE: "/provider/airtime",
    ELECTRICITY_PURCHASE: "/provider/validate_meter_number",
    CABLE_PURCHASE:  "/provider/validate_iuc",
  },
  
  REFERRAL: {
    REFERRAL_DASHBOARD: "/referral/dashboard",
    WITHDRAW_REFERRAL: "/referral/withdraw",
  },
  
  WALLET: {
    BALANCE: "/wallet/balance",
    WALLET_TRANSACTIONS: "/wallet/history",
    TRANSACTIONS: "/wallet/transactions",
  },
  NOTIFICATION: {
    GET_NOTIFICATION: "/notifications/get",
    MARK_READ_NOTIFICATION: "/notifications/read-all",
  },
  
});

export default ENDPOINTS;
