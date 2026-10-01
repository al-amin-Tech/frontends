// src/features/dashboard/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//import Header from "../../../shared/components/layout/Header";

import DashboardHeader from "../components/DashboardHeader";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import AccountCard from "../components/AccountCard";
import RecentTransactions from "../components/RecentTransactions";
import ServiceGrid from "../../../shared/components/services/ServiceGrid";

import ROUTES from "../../../shared/constants/routes";
import { useProfile } from "../../users/hooks/useProfile";
import { DASHBOARD_SERVICES } from "../../../shared/constants/navigation";
import Spinner from "../../../shared/components/ui/Spinner";
import Alert from "../../../shared/components/ui/Alert";

export default function DashboardPage() {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProfile();
   const handleServiceClick = (service) => {
    navigate(service.path);
  };


  useEffect(() => {
    if (!isError) return;

    Alert({
      type: "error",
      title: "Unable to load ",
      message:
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong.",
    });
  }, [isError, error]);


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }


  return (
    <div className="space-y-6 pb-24">

   {/* <DashboardHeader />  */}

      <WalletCard
        balance={data?.wallet}
      />

        <QuickActions
        onAction={(action) => navigate(action.path)}
      />

      <AccountCard
        account={data?.reserved_account}
      />
 

           <ServiceGrid
           services={DASHBOARD_SERVICES}
           onServiceClick={handleServiceClick}
          /> 
    <RecentTransactions
        transactions={[]}
        onViewAll={() =>
          navigate(ROUTES.TRANSACTIONS)
        }
      />  

    </div>
  );
}








/*

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/DashboardHeader";
import WalletCard from "../components/WalletCard";
import QuickActions from "../components/QuickActions";
import AccountCard from "../components/AccountCard";
import ServiceGrid from "../components/ServiceGrid";
import RecentTransactions from "../components/RecentTransactions";

import ROUTES from "../../../shared/constants/routes";
import { useAuth } from "../../auth/hooks/useAuth";

const quickActionRoutes = {
  "fund-wallet": ROUTES.WALLET,
  referral: ROUTES.REFERRAL,
  transactions: ROUTES.TRANSACTIONS,
  profile: ROUTES.PROFILE,
};

const serviceRoutes = {
  airtime: ROUTES.AIRTIME,
  data: ROUTES.DATA,
  electricity: ROUTES.ELECTRICITY,
  cable: ROUTES.CABLE,
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const walletBalance = user?.wallet?.balance ?? 0;
  const reservedAccount = user?.reserved_account ?? {};

  const handleQuickAction = useCallback(
    (action) => {
      const route = quickActionRoutes[action];
      if (route) navigate(route);
    },
    [navigate]
  );

  const handleServiceClick = useCallback(
    (service) => {
      const route = serviceRoutes[service];
      if (route) navigate(route);
    },
    [navigate]
  );

  return (
    <div className="space-y-6 pb-24">
      <DashboardHeader />

      <WalletCard balance={walletBalance} />

      <QuickActions onAction={handleQuickAction} />

      <AccountCard account={reservedAccount} />

      <ServiceGrid onServiceClick={handleServiceClick} />

      <RecentTransactions
        transactions={[]}
        onViewAll={() => navigate(ROUTES.TRANSACTIONS)}
      />
    </div>
  );
}


*/