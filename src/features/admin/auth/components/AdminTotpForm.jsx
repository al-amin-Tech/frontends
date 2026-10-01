// src/features/admin/auth/components/AdminTotpForm.jsx
// TODO: Adjust path
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyEmailOtpSchema } from '../schemas/adminAuth.schema';
import { Button, Alert } from '../../../../shared/components/ui'; 
import { OtpInput } from '../../../../shared/components/forms'; 

export default function AdminTotpForm({ mutation, onSuccess, isSetup, secretKey }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyEmailOtpSchema),
    defaultValues: { otp_code: '' },
    mode: 'onTouched',
  });

  const submit = async (values) => {
    try {
      await onSuccess(values.otp_code);
    } catch (error) {
      await Alert({
        type: 'error',
        title: 'Verification Failed',
        message: error?.response?.data?.message || error?.message || 'Unable to verify OTP.',
      });
      mutation.reset(); // Clear mutation error state
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6" noValidate>
      {isSetup && secretKey && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide">
            Setup Required: Save this secret key
          </p>
          <code className="block text-center text-sm font-mono font-bold text-blue-900 break-all bg-white p-3 rounded-lg border border-blue-100">
            {secretKey}
          </code>
        </div>
      )}

      <div className="flex justify-center">
        <OtpInput
          control={control}
          name="otp_code"
          length={6}
          error={errors.otp_code?.message}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        {isSetup ? 'Enable 2FA & Sign In' : 'Verify & Sign In'}
      </Button>
    </form>
  );
}