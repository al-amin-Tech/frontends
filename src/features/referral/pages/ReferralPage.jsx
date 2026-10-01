// src/features/referral/pages/ReferralPage.jsx

import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  Alert,
} from "../../../shared/components/ui";

import ReferralSummary from "../components/ReferralSummary";
import ReferralList from "../components/ReferralList";
import WithdrawReferralButton from "../components/WithdrawReferralButton";

import useReferralDashboard from "../hooks/useReferralDashboard";
import useWithdrawReferral from "../hooks/useWithdrawReferral";

import { referralKeys } from "../api/referralKeys";

export default function ReferralPage() {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useReferralDashboard("aminu");

  const withdrawMutation =
    useWithdrawReferral();

  const handleWithdraw =
    useCallback(async () => {
      try {
        const response =
          await withdrawMutation.mutateAsync();

        await Alert({
          type: "success",
          title:
            "Withdrawal Successful",
          message:
            response?.message ??
            "Referral commission withdrawn successfully.",
        });

        await queryClient.invalidateQueries({
          queryKey:
            referralKeys.dashboard(),
        });

      } catch (error) {
        await Alert({
          type: "error",
          title: "Withdrawal Failed",
          message:
            error?.response?.data
              ?.message ||
            error?.message ||
            "Unable to withdraw referral commission.",
        });

        withdrawMutation.reset();

        throw error;
      }
    }, [
      withdrawMutation,
      queryClient,
    ]);

  if (isLoading) {
    console.log(JSON.stringify(data, null, 2));
    return (

      <div className="py-16 text-center">
        Loading referral dashboard...
      
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-24">
      

      <div>

        <h1 className="text-2xl font-bold">
          Referral
        </h1>

        <p className="mt-2 text-gray-500">
          Invite friends, earn
          commissions, and withdraw
          your rewards.
        </p>

      </div>

      <ReferralSummary
        summary={data}
      />

      <WithdrawReferralButton
        balance={
          data?.total_commission_balance
        }
        mutation={
          withdrawMutation
        }
        onWithdraw={
          handleWithdraw
        }
      />

      <ReferralList
        referrals={
          data?.referrals ?? []
        }
      />

    </div>
  );
}