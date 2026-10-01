// src/features/users/components/ConfirmResetTransactionPinForm.jsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpInput } from '../../../shared/components/forms';

import {
  Button,
} from "../../../shared/components/ui";

import {
  PinInput,
} from "../../../shared/components/forms";

import {
  confirmResetTransactionPinSchema,
} from "../schemas/security.schema";

export default function ConfirmResetTransactionPinForm({
  mutation,
  onSubmit,
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(
      confirmResetTransactionPinSchema
    ),

    mode: "onTouched",

    defaultValues: {
      otp_code: "",
      new_pin: "",
      confirm_pin: "",
    },
  });

  const submit = async (values) => {
    await onSubmit?.({
      otp: values.otp_code,
      new_pin: values.new_pin,
      confirm_pin: values.confirm_pin,
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >
      <OtpInput
       label="Verification Code"
       required
        control={control}
        name="otp_code"
        length={6}
        error={errors.otp_code?.message}
      />
      
      <PinInput
        label="New Transaction PIN"
        required
        helperText="Enter a new 4-digit PIN."
        error={errors.new_pin?.message}
        {...register("new_pin")}
      />

      <PinInput
        label="Confirm Transaction PIN"
        required
        error={errors.confirm_pin?.message}
        {...register("confirm_pin")}
      />

      <Button
        type="submit"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !isDirty
        }
      >
        Reset Transaction PIN
      </Button>
    
    </form>
  );
}