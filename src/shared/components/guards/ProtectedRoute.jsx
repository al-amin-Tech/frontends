// src/shared/components/guards/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../../features/auth/hooks/useAuth";

import ROUTES from "../../constants/routes";
import Spinner from "../ui/Spinner";

export default function ProtectedRoute() {
  const location = useLocation();

  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  /*
   * Wait until authentication state
   * has been restored.
   */
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  /*
   * User is not authenticated.
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
   * User is authenticated.
   */
  return <Outlet />;
}