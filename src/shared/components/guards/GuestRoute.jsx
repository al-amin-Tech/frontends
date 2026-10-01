import { Navigate, Outlet, useLocation } from 'react-router-dom';

import ROUTES from '../../constants/routes';

import { useAuth } from '../../../features/auth/hooks/useAuth';

import Spinner from '../ui/Spinner';

export default function GuestRoute() {
  const location = useLocation();

  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  /*
   * Prevent rendering while the application
   * is restoring the authentication session.
   */
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  /*
   * Authenticated users should never access
   * guest-only pages such as:
   *
   * /login
   * /register
   * /forgot-password
   */
  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}