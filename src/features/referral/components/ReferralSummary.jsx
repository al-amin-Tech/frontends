// src/features/referral/components/ReferralSummary.jsx
// src/features/referral/components/ReferralSummary.jsx
import  formatAmount  from "../utils/formatAmount";
import ReferralCodeCard from "./ReferralCodeCard";
import { Card } from "../../../shared/components/ui";

export default function ReferralSummary({
  summary = {},
}) {
  const {
    total_invited_users = 0,
    total_qualified_referrals = 0,
    total_commission_earned = "0.00",
    total_commission_balance = "0.00",
    ReferralCode,
  } = summary;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">
          Referral Overview
        </h2>

        <p className="text-sm text-gray-500">
          Track your referral performance and
          available commission.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="space-y-2">
          <p className="text-sm text-gray-500">
            Invited Users
          </p>

          <p className="text-2xl font-bold">
            {total_invited_users}
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="text-sm text-gray-500">
            Qualified
          </p>

          <p className="text-2xl font-bold text-green-600">
            {total_qualified_referrals}
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="text-sm text-gray-500">
            Commission Earned
          </p>

          <p className="text-lg font-bold">
            {formatAmount(total_commission_earned)}
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="text-sm text-gray-500">
            Available Balance
          </p>

          <p className="text-lg font-bold text-blue-600">
            {formatAmount(total_commission_balance)}
          </p>
        </Card>
      </div>
      
      <ReferralCodeCard
        referralCode={
          ReferralCode
        }
      />
      
    </section>
  );
}

