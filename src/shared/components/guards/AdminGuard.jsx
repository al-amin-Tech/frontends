// src/shared/guards/AdminGuard.jsx
// TODO: Adjust paths to match your project structure
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../../features/admin/auth/hooks/useAdminAuth";
import { Spinner } from "../ui";
import { ADMIN_ROUTES } from "../../constants/routes";

export default function AdminGuard({ children }) {
  const { isAuthenticated, isInitializing, user } = useAdminAuth();
  const location = useLocation();

  // 1. Wait for auth state to initialize
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Spinner size="lg" />
      </div>
    );
  }

  // 2. Redirect to admin login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // 3. (Optional but Recommended) Strict Role Check
  // Prevents regular users from guessing admin URLs
  if (user && !['super_admin', 'support_admin', 'manager'].includes(user?.role)) {
    return <Navigate to="/" replace />; 
  }

  return children;
}