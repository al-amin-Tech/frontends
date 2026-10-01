// src/features/admin/auth/pages/AdminLoginPage.jsx
// TODO: Adjust path
import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AdminLoginForm from '../components/AdminLoginForm';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminLogin } from '../hooks/useAdminLogin';
import { ADMIN_ROUTES } from '../../../../shared/constants/routes'; // TODO: Adjust path
import { Alert } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, login } = useAdminAuth();
  const loginMutation = useAdminLogin();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(ADMIN_ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSuccess = async (loginValues) => {
    try {
      const response = await loginMutation.mutateAsync(loginValues);
      const { data } = response; // response.data is the 'data' object from sendSecureResponse

      // Branch 1: Email Verification Required
      if (data?.requireVerification) {
        navigate(ADMIN_ROUTES.VERIFY_EMAIL, {
          replace: true,
          state: { email: data.email },
        });
        return;
      }

      // Branch 2: TOTP Required (Super Admin)
      if (data?.requireTOTP) {
        navigate(ADMIN_ROUTES.VERIFY_TOTP, {
          replace: true,
          state: {
            isSetup: data.isSetup,
            secretKey: data.secretKey,
          },
        });
        return;
      }

      // Branch 3: Happy Path (Success)
      if (data?.access_token && data?.user) {
        login({
          accessToken: data.access_token,
          user: data.user,
        });

        navigate(ADMIN_ROUTES.DASHBOARD, {
          replace: true,
          state: { from: location.state?.from },
        });
      }
    } catch (error) {
      await Alert({
        type: 'error',
        title: 'Login Failed',
        message: error?.response?.data?.message || error?.message || 'Login Failed',
      });
      loginMutation.reset();
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Admin Console</h1>
        <p className="mt-2 text-gray-500">Sign in to access the operations dashboard.</p>
      </div>

      <AdminLoginForm mutation={loginMutation} onSuccess={handleLoginSuccess} />
      
     <div className="mt-8 space-y-3 text-center">

          <div>

          <Link
            to="/admin/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

        </div>

      </div>
    </div>
  );
}