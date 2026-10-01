// src/features/admin/auth/components/AdminLoginForm.jsx
// TODO: Adjust path
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { loginSchema } from '../schemas/adminAuth.schema';
import { Button, Input, Alert } from '../../../../shared/components/ui'; // TODO: Adjust path
import { PasswordInput } from '../../../../shared/components/forms'; // TODO: Adjust path

export default function AdminLoginForm({ mutation, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const submit = async (values) => {
    await onSuccess?.(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
      <Input
        label="Admin Email Address"
        leftIcon={<Mail size={20} />}
        required
        error={errors.email?.message}
        type="email"
        autoComplete="email"
        placeholder="admin@nairadesk.com"
        {...register('email')}
      />

      <PasswordInput
        label="Password"
        required
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Sign In to Console
      </Button>
    </form>
  );
}