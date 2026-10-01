import { useCallback, useEffect } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useChangePassword } from "../hooks/useChangePassword";

import {
  Alert,
  Card,
} from "../../../shared/components/ui";

export default function ChangePasswordPage() {
  const changePasswordMutation = useChangePassword();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await changePasswordMutation.mutateAsync(values);

        return true;
      } catch (error) {
        await Alert({
          type: "error",
          title: "Password Update Failed",
          message:
            error?.response?.data?.message ??
            error?.message ??
            "Unable to change password.",
        });

        changePasswordMutation.reset();

        throw error; // prevents ChangePasswordForm reset()
      }
    },
    [changePasswordMutation]
  );

  useEffect(() => {
    if (!changePasswordMutation.isSuccess) {
      return;
    }

    Alert({
      type: "success",
      title: "Password Updated",
      message: "Your password has been changed successfully.",
    });

    changePasswordMutation.reset();
  }, [
    changePasswordMutation.isSuccess,
    changePasswordMutation,
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Change Password
        </h1>

        <p className="mt-2 text-gray-500">
          Update your account password. Your current password is required
          before choosing a new one.
        </p>
      </div>

      <Card>
        <ChangePasswordForm
          mutation={changePasswordMutation}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}


/*

import { useCallback, useEffect } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useChangePassword } from "../hooks/useChangePassword";

import {
  Alert,
  Card,
} from "../../../shared/components/ui";

export default function ChangePasswordPage() {
  const changePasswordMutation = useChangePassword();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await changePasswordMutation.mutateAsync(values);
      } catch (error) {
        await Alert({
          type: "error",
          title: "Password Update Failed",
          message:
            error?.response?.data?.message ??
            error?.message ??
            "Unable to change password.",
        });

        changePasswordMutation.reset();
      }
    },
    [changePasswordMutation]
  );

  useEffect(() => {
    if (changePasswordMutation.isSuccess) {
      Alert({
        type: "success",
        title: "Password Updated",
        message: "Your password has been changed successfully.",
      });

      changePasswordMutation.reset();
    }
  }, [changePasswordMutation]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Change Password
        </h1>

        <p className="mt-2 text-gray-500">
          Update your account password. Your current password is required
          before choosing a new one.
        </p>
      </div>

      <Card>
        <ChangePasswordForm
          mutation={changePasswordMutation}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}*/
