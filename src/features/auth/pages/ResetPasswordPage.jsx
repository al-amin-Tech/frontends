// src/features/auth/pages/ResetPasswordPage.jsx
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useCompletePasswordReset } from '../hooks/useCompletePasswordReset';
import ROUTES from "../../../shared/constants/routes";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const completeReset = useCompletePasswordReset();
  
  const handleVerify = async (new_password) => {
    
   await completeReset.mutateAsync(new_password);
   
    navigate(ROUTES.LOGIN, {
      replace: true,
      state: {
        passwordReset: true,
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-md">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold">
          Create New Password
        </h1>

        <p className="mt-2 text-gray-500">
          Your identity has been verified.
        </p>

        <p className="text-gray-500">
          Create a new secure password for your account.
        </p>

      </div>

      <ResetPasswordForm
        mutation={completeReset}
        onSuccess={handleVerify}
      />

    </div>
  );
}