import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";

export default function ApiUserRoute() {
  const { user, isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  // Wait for authentication to initialize
  if (isInitializing) {
    return null; // or your loading component
  }

  // Not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in, but not an API user
  if (user.role !== "api_user") {
    return (
      <Navigate
        to="/more"
        replace
        state={{
          error: "Upgrade your account to become an API user",
        }}
      />
    );
  }

  return <Outlet />;
}



