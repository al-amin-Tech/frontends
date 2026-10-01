import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Alert,
} from '../../../shared/components/ui';
import { OtpInput } from '../../../shared/components/forms';
import { verifyEmailOtpSchema } from '../schemas/auth.schema';

export default function VerifyOtpForm({
  title = 'Verify OTP',
  description,
  mutation,
  onSuccess,
  onResend,
  isResending = false,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyEmailOtpSchema),
    defaultValues: {
      otp_code: '',
    },
    mode: 'onTouched',
  });

  const submit = async (values) => {
    
    try{
    // Let the parent page handle the verification
    await onSuccess(values.otp_code);
    }catch(error){
      
      await Alert({
        type: "error",
        title: "OTP Failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          'Unable to verify OTP.'
      });
      // Clear the mutation error state so the form behaves normally
      loginMutation.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >
      <div className="space-y-1">

        {description && (
          <p className="text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      <OtpInput
        control={control}
        name="otp_code"
        length={6}
        error={errors.otp_code?.message}
      />

      <Button
        type="submit"
        fullWidth
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Verify OTP
      </Button>

      {onResend && (
        <Button
          type="button"
          variant="secondary"
          fullWidth
          loading={isResending}
          disabled={isResending}
          onClick={onResend}
        >
          Resend OTP
        </Button>
      )}
    </form>
  );
}
