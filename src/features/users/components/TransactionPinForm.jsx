
// src/features/users/components/TransactionPinForm.jsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Alert,
  Button,
} from "../../../shared/components/ui";

import {
  PinInput,
  PasswordInput,
} from "../../../shared/components/forms";

import {
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  setTransactionPinSchema,
} from "../schemas/security.schema";

export default function TransactionPinForm({
  mutation,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(
      setTransactionPinSchema
    ),

    mode: "onTouched",

    defaultValues: {
      password: "",
      pin: "",
      confirm_pin: "",
    },
  });

  const submit = async (values) => {
    await onSubmit?.({
      password: values.password,
      pin: values.pin,
    });

    reset({
      password: "",
      pin: "",
      confirm_pin: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >

      <PasswordInput
        label="Account Password"
        required
        autoComplete="current-password"
        placeholder="Enter your account password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PinInput
        label="Transaction PIN"
        required
        maxLength={4}
        inputMode="numeric"
        autoComplete="off"
        placeholder="Enter 4-digit PIN"
        leftIcon={
          <ShieldCheck size={18} />
        }
        error={errors.pin?.message}
        {...register("pin")}
      />

      <PinInput
        label="Confirm Transaction PIN"
        required
        maxLength={4}
        inputMode="numeric"
        autoComplete="off"
        placeholder="Re-enter PIN"
        leftIcon={
          <LockKeyhole size={18} />
        }
        error={
          errors.confirm_pin?.message
        }
        {...register("confirm_pin")}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !isDirty
        }
      >
        Set Transaction PIN
      </Button>
    </form>
  );
}


