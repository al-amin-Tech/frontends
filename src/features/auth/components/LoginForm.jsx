// src/features/auth/components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { loginSchema } from "../schemas/auth.schema";
import {
  Button,
  Input,
  Alert,
} from "../../../shared/components/ui";
import {
  PasswordInput,
} from "../../../shared/components/forms";

export default function LoginForm({
  defaultValues = {
    email: "",
    password: "",
  },
  mutation,
  onSuccess,
}) {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onTouched",
  });

  const submit = async (values) => {
      // Let the parent page handle the verification
    await onSuccess?.(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
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
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        required
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSuccess?.({ action: "forgot-password" })}
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        Sign In
      </Button>
    </form>
  );
}
