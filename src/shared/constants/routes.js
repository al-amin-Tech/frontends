// src/shared/constants/routes.js

const ROUTES = {
  /*
   * Public Routes
   */
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_PASSWORD_OTP: "/verify-password-otp",
  RESET_PASSWORD: "/reset-password",

  /*
   * Dashboard
   */
  DASHBOARD: "/dashboard",
  NOTIFICATIONS_EVEVT: "/notifications-event",
  

  /*
   * User
   */
  PROFILE: "/profile",
  PROFILE_INFORMATION: "/profile/personal-information",
  CHANGE_PASSWORD: "/profile/change-password",
  TRANSACTION_PIN: "/profile/transaction-pin",
  REQUEST_RESET_TRANSACTION_PIN: "/profile/transaction-pin/reset",
  CONFIRM_RESET_TRANSACTION_PIN: "/profile/transaction-pin/reset/confirm",
  UPGRADE_ACCOUNT: "/profile/upgrade-account",
  NOTIFICATIONS: "/profile/notifications",
  THEME_SETTINGS: "/settings/theme",
  HELP: "/profile/help",
  CONTACT_US: "/profile/help",
  LEGAL: "/profile/legal",

  
  USERS: "/users",

  /*
   * Wallet
   */
  WALLET: "/wallet",

  /*
   * Transactions
   */
  TRANSACTIONS: "/transactions",
  PURCHASE_HISTORY: "/transactions/:category",
  PURCHASE_DETAILS: "/transactions/details/:reference",
   

  /*
   * Referral
   */
  REFERRAL: "/referral",

  /*
   * Services
   */
  AIRTIME: "/airtime",
  DATA: "/data",
  ELECTRICITY: "/electricity",
  CABLE: "/cable",
  EDUCATION: "/education",
  RECHARGE_PIN: "/recharge-pin",
  BULK_SMS: "/bulk-sms",
  PRICING: "/pricing",
  API_KEYS: "/api-keys",

  /*
   * More
   */
  MORE: "/more",
  FUND_WALLET: "/deposit",
  DEPOSIT: "/deposit",
  DEPOSIT_AMOUNT: "/deposit/amount",

  /*
   * Settings
   */
  CONDITIONS: "/legal/terms-and-conditions",
  
  POLICY: "/legal/privacy-policy",

  /*
   * Fallback
   */
  NOT_FOUND: "*",
};




 const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  VERIFY_EMAIL: '/admin/verify-email',
  FORGOT_PASSWORD: '/admin/forgot-password',
  VERIFY_TOTP: '/admin/verify-totp',
  RESET_PASSWORD: "/admin/reset-password",
  VERIFY_PASSWORD_OTP: "/admin/verify-password-otp",
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
};

export {
  ROUTES,
  ADMIN_ROUTES,
};

export default ROUTES;

/*
// src/shared/constants/routes.js

const ROUTES = {
  /*
   * ------------------------------------------------
   * Public Routes
   * ------------------------------------------------
   *
  ROOT: "/",

  LOGIN: "/login",
  REGISTER: "/register",

  VERIFY_EMAIL: "/verify-email",

  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_PASSWORD_OTP: "/verify-password-otp",
  RESET_PASSWORD: "/reset-password",

  /*
   * ------------------------------------------------
   * Dashboard
   * ------------------------------------------------
   *
  DASHBOARD: "/dashboard",

  /*
   * ------------------------------------------------
   * Wallet
   * ------------------------------------------------
   *
  WALLET: "/wallet",
  FUND_WALLET: "/wallet/fund",

  /*
   * ------------------------------------------------
   * Transactions
   * ------------------------------------------------
   *
  TRANSACTIONS: "/transactions",
  TRANSACTION_DETAILS: "/transactions/:reference",

  /*
   * ------------------------------------------------
   * Profile
   * ------------------------------------------------
   *
  PROFILE: "/profile",

  
  SECURITY: "/profile/security",

  TRANSACTION_PIN: "/profile/transaction-pin",

  

  

  KYC: "/profile/kyc",

  

  
  
,
  /*
   * ------------------------------------------------
   * Referral
   * ------------------------------------------------
   *
  REFERRAL: "/referral",

  /*
   * ------------------------------------------------
   * Services
   * ------------------------------------------------
   *
  AIRTIME: "/airtime",

  DATA: "/data",

  ELECTRICITY: "/electricity",

  CABLE: "/cable",

  EDUCATION: "/education",

  RECHARGE_PIN: "/recharge-pin",

  BULK_SMS: "/bulk-sms",

  API_KEYS: "/api-keys",

  MORE: "/more",

  /*
   * ------------------------------------------------
   * Settings
   * ------------------------------------------------
   *
  SETTINGS: "/settings",
  
  /*
   * ------------------------------------------------
   * Errors
   * ------------------------------------------------
   *
  NOT_FOUND: "*",
};

export default ROUTES;

*/