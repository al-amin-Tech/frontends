import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Alert, Input,
} from '../../../shared/components/ui';
import { PasswordInput
} from '../../../shared/components/forms';
import PasswordStrength from './PasswordStrength';
import { completePasswordResetSchema } from '../schemas/auth.schema';

export default function ResetPasswordForm({
  mutation,
  onSuccess,
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(completePasswordResetSchema),
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
    mode: 'onTouched',
  });

  const password = watch('new_password');

  const submit = async (values) => {
    try{
     await onSuccess(values.new_password);
     
    }catch(error){
      await Alert({
       type: "error",
       title: "password Failed",
       message:
       error?.response?.data?.message ||
       error?.message ||
      'Unable to reset password.'
      });

      // Clear the mutation error state so the form behaves normally
      mutation.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >
      <PasswordInput
        label="New Password"
        required
        autoComplete="new-password"
        error={errors.new_password?.message}
        {...register('new_password')}
      />

      <PasswordStrength
        password={password}
      />

      <PasswordInput
        label="Confirm Password"
        required
        autoComplete="new-password"
        error={errors.confirm_password?.message}
        {...register('confirm_password')}
      />

      <Button
        type="submit"
        fullWidth
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Reset Password
      </Button>
    </form>
  );
}