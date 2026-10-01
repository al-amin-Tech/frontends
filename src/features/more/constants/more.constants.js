import {
  User,
  Users,
  Shield,
  Lock,
  Landmark,
  BadgeCheck,
  Bell,
  Settings,
  CircleHelp,
  Phone,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";

import ROUTES from "../../../shared/constants/routes";

export const ACCOUNT_ITEMS = [
  {
    id: "profile",
    title: "Profile",
    subtitle: "Manage your personal information",
    icon: User,
    path: ROUTES.PROFILE,
  },
  {
    id: "bank-accounts",
    title: "Bank Accounts",
    subtitle: "Manage your saved bank accounts",
    icon: Landmark,
    path: ROUTES.FUND_WALLET,
  },
  {
    id: "beneficiaries",
    title: "Beneficiaries",
    subtitle: "Manage saved beneficiaries",
    icon: Users,
    path: ROUTES.BENEFICIARIES,
  },
  {
    id: "kyc",
    title: "KYC Verification",
    subtitle: "Verify your identity",
    icon: BadgeCheck,
    path: ROUTES.KYC,
  },
];

export const SECURITY_ITEMS = [
  {
    id: "security",
    title: "Security",
    subtitle: "Protect your account",
    icon: Shield,
    path: ROUTES.SECURITY,
  },
  {
    id: "change-password",
    title: "Change Password",
    subtitle: "Update your login password",
    icon: Lock,
    path: ROUTES.CHANGE_PASSWORD,
  },
];

export const REWARD_ITEMS = [
  {
    id: "referral",
    title: "Referral",
    subtitle: "Invite friends and earn",
    icon: Users,
    path: ROUTES.REFERRAL,
  },
];

export const SUPPORT_ITEMS = [
  {
    id: "contact",
    title: "Contact Us",
    subtitle: "Reach our support team",
    icon: Phone,
    path: ROUTES.CONTACT_US,
  },
  {
    id: "faq",
    title: "FAQ",
    subtitle: "Frequently asked questions",
    icon: CircleHelp,
    path: ROUTES.HELP,
  },
];

export const APP_ITEMS = [
  {
    id: "notifications",
    title: "Notifications",
    subtitle: "Manage notification preferences",
    icon: Bell,
    path: ROUTES.NOTIFICATIONS,
  },
  {
    id: "settings",
    title: "Settings",
    subtitle: "Configure your application",
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
  {
    id: "about",
    title: "About",
    subtitle: "Application information",
    icon: Info,
    path: ROUTES.LEGAL,
  },
];

export const LOGOUT_ITEM = {
  id: "logout",
  title: "Logout",
  subtitle: "Sign out of your account",
  icon: LogOut,
};

export { ChevronRight };