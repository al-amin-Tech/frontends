import { useNavigate, useLocation } from 'react-router-dom';
import VerifyOtpForm from '../components/VerifyOtpForm';
import { useVerifyPasswordResetOtp } from '../hooks/useVerifyPasswordResetOtp';
import ROUTES from "../../../shared/constants/routes";

export default function VerifyPasswordOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const verifyOtp = useVerifyPasswordResetOtp();

  const handleVerify = async (otp) => {
    await verifyOtp.mutateAsync(otp);

    navigate(ROUTES.RESET_PASSWORD, {
      replace: true,
      state: {
        email,
      },
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Verify Reset Code
        </h1>

        <p className="mt-2 text-gray-500">
          Enter the verification code sent to
        </p>

        <p className="mt-1 font-semibold">
          {email ?? 'your email'}
        </p>
      </div>

      <VerifyOtpForm
        mutation={verifyOtp}
        onSuccess={handleVerify}
      />
    </div>
  );
}
