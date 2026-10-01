// src/shared/constants/navigation.js

import {
  LayoutDashboard,
  Wallet,
  ReceiptText,
  User,
  Grid2X2,
  Users,
  Smartphone,
  Wifi,
  Zap,
  Tv,
  GraduationCap,
  KeyRound,
  Send,
  CreditCard,
  Webhook,
  Landmark,
} from "lucide-react";

import ROUTES from "./routes";

/**
 * --------------------------------------
 * Bottom Navigation
 * --------------------------------------
 */

export const BOTTOM_NAVIGATION = [
  {
    id: "dashboard",
    label: "Home",
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
    path: ROUTES.WALLET,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: ReceiptText,
    path: ROUTES.TRANSACTIONS,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: ROUTES.PROFILE,
  },
  {
    id: "more",
    label: "More",
    icon: Grid2X2,
    path: ROUTES.MORE,
  },
];

/**
 * --------------------------------------
 * Sidebar Navigation
 * --------------------------------------
 */

export const SIDEBAR_NAVIGATION = [
  ...BOTTOM_NAVIGATION,
];

/**
 * --------------------------------------
 * Dashboard Quick Actions
 * --------------------------------------
 */

export const QUICK_ACTIONS = [
  {
    id: "fund-wallet",
    label: "Fund Wallet",
    icon: Landmark,
    path: ROUTES.FUND_WALLET,
  },
  {
    id: "referral",
    label: "Referral",
    icon: Users,
    path: ROUTES.REFERRAL,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: ReceiptText,
    path: ROUTES.TRANSACTIONS,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: ROUTES.PROFILE,
  },
];

/**
 * --------------------------------------
 * Dashboard Services
 * --------------------------------------
 */

export const DASHBOARD_SERVICES = [
  {
    id: "airtime",
    title: "Airtime",
    icon: Smartphone,
    path: ROUTES.AIRTIME,
    subtitle: "Top up any network",
  },
  {
    id: "data",
    title: "Data",
    icon: Wifi,
    path: ROUTES.DATA,
    subtitle: "Buy data bundles",
  },
  {
    id: "electricity",
    title: "Electricity",
    icon: Zap,
    path: ROUTES.ELECTRICITY,
    subtitle: "Pay electricity bills",
  },
  {
    id: "cable",
    title: "Cable TV",
    icon: Tv,
    path: ROUTES.CABLE,
    subtitle: "DSTV • GOTV • Startimes",
  },
];

/**
 * --------------------------------------
 * More Page Services
 * --------------------------------------
 */

export const MORE_SERVICES = [
  ...DASHBOARD_SERVICES,

  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    path: ROUTES.EDUCATION,
  },

  {
    id: "recharge-pin",
    title: "Recharge PIN",
    icon: CreditCard,
    path: ROUTES.RECHARGE_PIN,
  },

  {
    id: "bulk-sms",
    title: "Bulk SMS",
    icon: Send,
    path: ROUTES.BULK_SMS,
  },

  {
    id: "api-keys",
    title: "API Keys",
    icon: KeyRound,
    path: ROUTES.API_KEYS,
  },
  {
    id: "pricing",
    title: "pricing",
    icon: CreditCard,
    path: ROUTES.PRICING,
  },

  {
    id: "Developer's API",
    title: "Developer's API",
    icon: Webhook,
    path: ROUTES.API_KEYS,
  },
];


