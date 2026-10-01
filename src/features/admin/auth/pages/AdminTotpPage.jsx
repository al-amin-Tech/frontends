// src/features/admin/auth/pages/AdminVerifyTotpPage.jsx
// TODO: Adjust path
import { useNavigate, useLocation } from 'react-router-dom';
import AdminTotpForm from '../components/AdminTotpForm';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminVerifyTotp } from '../hooks/useAdminVerifyTotp';
import { ADMIN_ROUTES } from '../../../../shared/constants/routes'; // TODO: Adjust path
import { Alert, Spinner } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function AdminVerifyTotpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdminAuth();
  
  const { isSetup, secretKey } = location.state || {};
  
  const verifyTotpMutation = useAdminVerifyTotp();

  const handleVerifySuccess = async (otp_code) => {
    try {
      const response = await verifyTotpMutation.mutateAsync(otp_code );
      const { data } = response;

      if (data?.access_token && data?.user) {
        login({
          accessToken: data.access_token,
          user: data.user,
        });

        await Alert({
          type: 'success',
          title: 'Success',
          message: 'Authentication successful. Welcome to the Admin Console.',
        });

        navigate(ADMIN_ROUTES.DASHBOARD, { replace: true });
      }
    } catch (error) {
      // Error is handled inside the Form component's catch block, 
      // but we reset the mutation here to allow retry
      verifyTotpMutation.reset();
      throw error; // Re-throw to trigger the form's catch block
    }
  };

  if (verifyTotpMutation.isPending && !verifyTotpMutation.isError) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
        <p className="mt-2 text-gray-500">
          {isSetup 
            ? 'Set up your authenticator app and enter the 6-digit code.' 
            : 'Enter the 6-digit code from your Authenticator app.'}
        </p>
      </div>

      <AdminTotpForm
        mutation={verifyTotpMutation}
        onSuccess={handleVerifySuccess}
        isSetup={isSetup}
        secretKey={secretKey}
      />

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => navigate(ADMIN_ROUTES.LOGIN, { replace: true })}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}