import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/auth.schema';
import { useRegister } from '../hooks/useRegister';
import { Phone, Gift, User, Mail } from 'lucide-react';
import {
  Button,
  Alert,
  Input,
} from '../../../shared/components/ui';
import { 
  PasswordInput
} from '../../../shared/components/forms';
import PasswordStrength from './PasswordStrength';

export default function RegisterForm({
  defaultValues = {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    referral_code: '',
  },
  onSuccess,
}) {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const password = watch('password');

  const submit = async (values) => {
    try{
    const response = await registerMutation.mutateAsync(values);
    
    await Alert({
        type: "success",
        title: "Registration successfully",
        message: response?.message || "Your account has been created successfully."
      });
    onSuccess?.(response);
    
     }catch(error){
       await Alert({
        type: "error",
        title: "Registration Failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
           'Registration failed.'
      });
      // Clear the mutation error state so the form behaves normally
      registerMutation.reset(); 
      
    }
 };
  
  
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
      noValidate
    >
      <Input
        label="Full Name"
        leftIcon={<User size={20} />}
        required
        error={errors.full_name?.message}
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          {...register('full_name')}
        />

      <Input
        label="Email Address"
        leftIcon={<Mail size={20} />}
        required
        error={errors.email?.message}
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          {...register('email')}
        />

      <Input
        label="Phone Number"
        leftIcon={<Phone size={20} />}
        required
        error={errors.phone?.message}
          type="tel"
          placeholder="08012345678"
          autoComplete="tel"
          {...register('phone')}
        />

      <PasswordInput
        label="Password"
        required
        placeholder="Create password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
     
        {password && (
        <PasswordStrength password={password} />
      )}
     
      <Input
        label="Referral Code (Optional)"
        leftIcon={<Gift size={20} />}
        error={errors.referral_code?.message}
          type="text"
          placeholder="Referral Code"
          {...register('referral_code')}
        />

      <Button
        type="submit"
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
        fullWidth
      >
        Create Account
      </Button>
    </form>
  );
}