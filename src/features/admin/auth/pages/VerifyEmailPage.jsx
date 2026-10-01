import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VerifyOtpForm from '../components/VerifyOtpForm';
import { useVerifyEmailOtp } from '../hooks/useVerifyEmailOtp';
import { useCompleteEmailVerification } from '../hooks/useCompleteEmailVerification';
import ADMIN_ROUTES from "../../../../shared/constants/routes";
import {
  Alert,
  Spinner,
} from '../../../../shared/components/ui';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = useVerifyEmailOtp();
  const completeVerification = useCompleteEmailVerification();

  const [error, setError] = useState('');

  const handleVerify = async (otp) => {
    setError('');

    try {
      // Verify the OTP
      await verifyOtp.mutateAsync(otp);

      // Mark email as verified
      await completeVerification.mutateAsync();

      // Redirect to login
      navigate(ADMIN_ROUTES.LOGIN, {
        replace: true,
        state: {
          emailVerified: true,
        },
      });
    } catch (err) {
      const message =
      err?.response?.data?.message ||
      err?.message ||
     'Unable to verify email.';
      setError(message);

     await Alert({
      type: 'error',
      title: 'OTP Failed',
      message,
      });
      // Clear the mutation error state so the form behaves normally
      verifyOtp.reset();
      completeVerification.reset();
    }
  };

  if (completeVerification.isPending) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Verify Your Email
        </h1>

        <p className="mt-2 text-gray-500">
          Enter the six-digit verification code sent to
        </p>

        <p className="mt-1 font-semibold">
          {email ?? 'your email address'}
        </p>
      </div>


      <VerifyOtpForm
        mutation={verifyOtp}
        onSuccess={handleVerify}
      />

      <div className="mt-8 text-center">
        <Link
          to="/admin/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
