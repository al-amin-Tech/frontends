// src/features/membership/pages/UpgradeAccountPage.jsx

import { useEffect } from "react";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";

import {
  Alert,
  Card,
} from "../../../shared/components/ui";

import { useAuth } from "../../auth/hooks/useAuth";

import UpgradeCard from "../components/UpgradeCard";
import UpgradeAccountForm from "../components/UpgradeAccountForm";

import { useUpgradePrice } from "../hooks/useUpgradePrice";
import { useUpgradeAccount } from "../hooks/useUpgradeAccount";


export default function UpgradeAccountPage() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const currentRole =
    user?.role ?? "user";

  const [
    selectedRole,
    setSelectedRole,
  ] = useState("");

  const priceQuery =
    useUpgradePrice(selectedRole);

  const upgradeMutation =
    useUpgradeAccount(selectedRole);

  const handleRoleChange =
    useCallback((role) => {
      setSelectedRole(role);
    }, []);

  const handleSubmit =
    useCallback(
      async (values) => {

        try {
          await upgradeMutation.mutateAsync(
            values
          );

          await Alert({
            type: "success",
            title: "Upgrade Successful",
            message:
              "Your account has been upgraded successfully. Please sign in again to continue.",
          });

          logout();

          navigate(
            ROUTES.LOGIN,
            {
              replace: true,
            }
          );
        } catch (error) {
          await Alert({
            type: "error",
            title: "Upgrade Failed",
            message:
              error?.response?.data
                ?.message ||
              error?.message ||
              "Unable to upgrade your account.",
          });

          upgradeMutation.reset();
        }
      },
      [
        logout,
        navigate,
        upgradeMutation,
      ]
    );

  const noUpgradeAvailable =
    useMemo(() => {
      return currentRole === "agent";
    }, [currentRole]);

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-24">

      <div>

        <h1 className="text-2xl font-bold">
          Upgrade Account
        </h1>

        <p className="mt-2 text-gray-500">
          Upgrade your account to unlock
          additional platform features.
        </p>

      </div>

      <UpgradeCard
        currentRole={currentRole}
      />

      {noUpgradeAvailable ? (
        <Card>

          <p className="text-gray-600">
            Your account already has the
            highest membership level.
          </p>

        </Card>
      ) : (
      

        <Card>

          <UpgradeAccountForm
            currentRole={currentRole}
            priceQuery={priceQuery}
            mutation={
              upgradeMutation
            }
            onRoleChange={
              handleRoleChange
            }
            onSubmit={
              handleSubmit
            }
          />

        </Card>
        
      )}

    </div>
  );
}
