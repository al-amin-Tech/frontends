// src/features/users/pages/ProfilePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  ShieldCheck,
  KeyRound,
  LockKeyhole,
  BadgeCheck,
  FileCheck,
  Bell,
  Moon,
  CircleHelp,
  FileText,
  LogOut,
  Users,
} from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth";

import ProfileHeader from "../components/ProfileHeader";
import ProfileSection from "../components/ProfileSection";
import ProfileMenuItem from "../components/ProfileMenuItem";
import DarkModeToggle from "../components/DarkModeToggle";

import ROUTES from "../../../shared/constants/routes";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(false);

  const go = (path) => () => navigate(path);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  };

  return (
    <div className="space-y-8 pb-24">

      <ProfileHeader user={user} />

      {/* ---------------- General ---------------- */}

      <ProfileSection title="General">

        <ProfileMenuItem
          icon={User}
          title="Personal Information"
          description="View and update your personal details."
          onClick={go(ROUTES.PROFILE_INFORMATION)}
        />

        <ProfileMenuItem
          icon={ShieldCheck}
          title="Security"
          description="Manage account security."
          onClick={go(ROUTES.SECURITY)}
        />

        <ProfileMenuItem
          icon={KeyRound}
          title="Transaction PIN"
          description="Create or update your transaction PIN."
          onClick={go(ROUTES.TRANSACTION_PIN)}
        />

        <ProfileMenuItem
          icon={LockKeyhole}
          title="Change Password"
          description="Update your login password."
          onClick={go(ROUTES.CHANGE_PASSWORD)}
        />

        <ProfileMenuItem
          icon={BadgeCheck}
          title="Upgrade Account"
          description="Upgrade your membership."
          onClick={go(ROUTES.UPGRADE_ACCOUNT)}
        />

        <ProfileMenuItem
          icon={FileCheck}
          title="KYC Verification"
          description="Complete identity verification."
          onClick={go(ROUTES.KYC)}
        />

        <ProfileMenuItem
          icon={Users}
          title="Referral"
          description="Referral link, bonus and commissions."
          onClick={go(ROUTES.REFERRAL)}
        />

      </ProfileSection>

      {/* ---------------- Preferences ---------------- */}

      <ProfileSection title="Preferences">

        <ProfileMenuItem
          icon={Bell}
          title="Notifications"
          description="Manage notification settings."
          onClick={go(ROUTES.NOTIFICATIONS)}
        />

        <ProfileMenuItem
            id="dark-mode"
            icon={Moon}
            title="Dark Mode"
            description="Application appearance"
            onClick={go(ROUTES.THEME_SETTINGS)}
        />

    
      </ProfileSection>

      {/* ---------------- Support ---------------- */}

      <ProfileSection title="Support">

        <ProfileMenuItem
          icon={CircleHelp}
          title="Help & Support"
          description="Contact customer support."
          onClick={go(ROUTES.HELP)}
        />

        <ProfileMenuItem
          icon={FileText}
          title="Legal"
          description="Privacy Policy & Terms."
          onClick={go(ROUTES.LEGAL)}
        />

        <ProfileMenuItem
          icon={LogOut}
          title="Logout"
          description="Sign out from your account."
          danger
          onClick={handleLogout}
        />

      </ProfileSection>

    </div>
  );
}