// src/features/more/pages/MorePage.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import ServiceGrid from "../../../shared/components/services/ServiceGrid";
import { Alert } from "../../../shared/components/ui";

import {
  MORE_SERVICES,
} from "../../../shared/constants/navigation";

import {
  ACCOUNT_ITEMS,
  REWARD_ITEMS,
  SECURITY_ITEMS,
  SUPPORT_ITEMS,
  APP_ITEMS,
} from "../constants/more.constants";

import MoreSection from "../components/MoreSection";
import LogoutButton from "../components/LogoutButton";



export default function MorePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(location.state?.error || null);

    useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);

      // Remove the error from browser history
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!error) return;

    Alert({
      type: "info",
      title: "Access denied",
      message: error ?? "Airtime purchase completed.",
    });

    setError(null);
  }, [error]);
  

  const handleNavigate = (item) => {
    navigate(item.path);
  };

  const handleLogout = () => {
    // TODO
  };

  return (
    <div className="space-y-8">


      <ServiceGrid
        title="All Services"
        subtitle="Explore all available services."
        services={MORE_SERVICES}
        onServiceClick={handleNavigate}
      />

      <MoreSection
        title="Account"
        items={ACCOUNT_ITEMS}
        onItemClick={handleNavigate}
      />

      <MoreSection
        title="Rewards"
        items={REWARD_ITEMS}
        onItemClick={handleNavigate}
      />

      <MoreSection
        title="Security"
        items={SECURITY_ITEMS}
        onItemClick={handleNavigate}
      />

      <MoreSection
        title="Support"
        items={SUPPORT_ITEMS}
        onItemClick={handleNavigate}
      />

      <MoreSection
        title="Application"
        items={APP_ITEMS}
        onItemClick={handleNavigate}
      />

      <LogoutButton
        onClick={handleLogout}
      />

    </div>
  );
}