// src/features/users/components/ChangePasswordForm.jsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../shared/components/ui";

import {
  PasswordInput,
} from "../../../shared/components/forms";

import PasswordStrength from "../../auth/components/PasswordStrength";

import {
  changePasswordSchema,
} from "../schemas/security.schema";

export default function ChangePasswordForm({
  mutation,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const newPassword = watch("new_password");

  const submit = async (values) => {
    await onSubmit({
      old_password: values.old_password,
      new_password: values.new_password,
    });

    // Only reached if the submission succeeds.
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >
      <PasswordInput
        label="Current Password"
        required
        autoComplete="current-password"
        placeholder="Enter current password"
        error={errors.old_password?.message}
        {...register("old_password")}
      />

      <PasswordInput
        label="New Password"
        required
        autoComplete="new-password"
        placeholder="Enter new password"
        error={errors.new_password?.message}
        {...register("new_password")}
      />

      {newPassword && (
        <PasswordStrength password={newPassword} />
      )}

      <PasswordInput
        label="Confirm New Password"
        required
        autoComplete="new-password"
        placeholder="Confirm new password"
        error={errors.confirm_password?.message}
        {...register("confirm_password")}
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
        Change Password
      </Button>
    </form>
  );
}
