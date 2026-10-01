// src/features/auth/pages/ForgotPasswordPage.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordResetSchema } from '../schemas/auth.schema';
import { useRequestPasswordReset } from '../hooks/useRequestPasswordReset';
import { Mail } from 'lucide-react';
import ROUTES from "../../../shared/constants/routes";

import {
  Button,
  Alert,
  Input
} from '../../../shared/components/ui';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const requestReset = useRequestPasswordReset();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const submit = async (values) => {
    
    try{
    await requestReset.mutateAsync(values.email);
    
    navigate(ROUTES.VERIFY_PASSWORD_OTP, {
      replace: true,
      state: {
        email: values.email,
      },
    });
    
    }catch(error){
    
      await Alert({
      type: "error",
      title: "request Failed",
      message:
      error?.response?.data?.message ||
      error?.message ||
      'Unable to process your request.'
      });

      // Clear the mutation error state so the form behaves normally
      requestReset.reset();
    }

  };

  return (
    <div className="mx-auto w-full max-w-md">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your email address and we'll send you a verification code.
        </p>

      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6"
        noValidate
      >

        <Input
          label="Email Address"
          leftIcon={<Mail size={20} />}
          required
          error={errors.email?.message}
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register('email')}
          />

        <Button
          type="submit"
          fullWidth
          loading={requestReset.isPending}
          disabled={requestReset.isPending}
        >
          Send Verification Code
        </Button>

      </form>

      <div className="mt-8 text-center">

        <Link
          to="/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}