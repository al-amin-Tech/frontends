// src/features/referral/components/ReferralCard.jsx
import  formatAmount  from "../utils/formatAmount";
import ReferralProgress from "./ReferralProgress";
import ReferralCountdown from "./ReferralCountdown";
import ReferralStatus from "./ReferralStatus";


export default function ReferralCard({
  referral,
}) {
  if (!referral) {
    return null;
  }

  return (
    <article
      className="
        rounded-2xl
        border
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-5">

        <h3 className="text-lg font-semibold">
          {referral.user}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Referral Reward{" "}
          <span className="font-medium text-blue-600">
            {formatAmount(
              referral.reward
            )}
          </span>
        </p>

      </div>

      {/* Progress */}

      <ReferralProgress
        totalSpent={
          referral.total_spent
        }
        spendRequired={
          referral.spend_required
        }
      />

      <div className="my-5 border-t" />

      {/* Countdown */}

      <ReferralCountdown
        expiry={referral.expiry}
      />

      <div className="my-5 border-t" />

      {/* Status */}

      <ReferralStatus
        status={referral.status}
        totalSpent={
          referral.total_spent
        }
        spendRequired={
          referral.spend_required
        }
      />

    </article>
  );
}


/*






import { Card } from "../../../shared/components/ui";

const STATUS_CLASSES = {
  paid: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-red-100 text-red-700",
};

export default function ReferralCard({
  referral,
}) {
  const status =
    referral?.status?.toLowerCase() ??
    "active";

  return (
    <Card className="space-y-4">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="font-semibold">
            {referral?.user ?? "-"}
          </h3>

          <p className="text-sm text-gray-500">
            Expires{" "}
            {referral?.expiry
              ? new Date(
                  referral.expiry
                ).toLocaleDateString()
              : "-"}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            STATUS_CLASSES[status] ??
            "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="grid grid-cols-3 gap-4">

        <div>

          <p className="text-xs text-gray-500">
            Spent
          </p>

          <p className="font-semibold">
            ₦
            {referral?.total_spent ??
              "0.00"}
          </p>

        </div>

        <div>

          <p className="text-xs text-gray-500">
            Required
          </p>

          <p className="font-semibold">
            ₦
            {referral?.spend_required ??
              "0.00"}
          </p>

        </div>

        <div>

          <p className="text-xs text-gray-500">
            Reward
          </p>

          <p className="font-semibold text-blue-600">
            ₦
            {referral?.reward ??
              "0.00"}
          </p>

        </div>

      </div>

    </Card>
  );
}

*/