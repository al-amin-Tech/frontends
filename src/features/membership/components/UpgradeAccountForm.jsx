// src/features/membership/components/UpgradeAccountForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Card,
  Select,
} from "../../../shared/components/ui";

import {
  PinInput,
} from "../../../shared/components/forms";

import {
  upgradeAccountSchema,
} from "../schemas/membership.schema";

export default function UpgradeAccountForm({
  currentRole,
  priceQuery,
  mutation,
  onRoleChange,
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
    resolver: zodResolver(
      upgradeAccountSchema
    ),

    mode: "onTouched",

    defaultValues: {
      targetRole: "",
      transactionPin: "",
    },
  });

  const selectedRole =
    watch("targetRole");

  useEffect(() => {
    if (
      selectedRole &&
      selectedRole !== currentRole
    ) {
      onRoleChange?.(selectedRole);
    }
  }, [
    selectedRole,
    currentRole,
    onRoleChange,
  ]);

const submit = async (values) => {
  await onSubmit?.({
    transaction_pin: values.transactionPin,
  });

  reset();
};


  const roleOptions = [
    {
      label: "Vendor",
      value: "vendor",
    },
    {
      label: "API User",
      value: "api_user",
    },
    {
      label: "Agent",
      value: "agent",
    },
  ].filter(
    (role) =>
      role.value !== currentRole
  );

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6"
      noValidate
    >
      <Select
        label="Upgrade To"
        placeholder="Select account type"
        options={roleOptions}
        error={
          errors.targetRole?.message
        }
        {...register("targetRole")}
      />

      {selectedRole && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-2">

            <h3 className="font-semibold">
              Upgrade Fee
            </h3>

            {priceQuery?.isLoading && (
              <p className="text-sm text-gray-500">
                Loading price...
              </p>
            )}

            {priceQuery?.data && (
              <>
                <p className="text-2xl font-bold text-blue-600">
                  ₦
                  {priceQuery.data.data}
                </p>

                <p className="text-sm text-gray-600">
                  {
                    priceQuery.data
                      .message
                  }
                </p>
              </>
            )}

          </div>
        </Card>
      )}

      <PinInput
        label="Transaction PIN"
        required
        helperText="Enter your current transaction PIN to authorize this upgrade."
        error={
          errors.transactionPin
            ?.message
        }
        {...register(
          "transactionPin"
        )}
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
        Upgrade Account
      </Button>
    </form>
  );
}