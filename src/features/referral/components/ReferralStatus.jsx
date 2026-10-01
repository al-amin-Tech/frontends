// src/features/referral/components/ReferralStatus.jsx

import formatAmount from "../utils/formatAmount";

function parseAmount(value) {
  const amount = Number(value ?? 0);

  return Number.isNaN(amount)
    ? 0
    : amount;
}

export default function ReferralStatus({
  status,
  totalSpent,
  spendRequired,
  reward,
  expiry,
}) {
  const spent = parseAmount(totalSpent);
  const required = parseAmount(spendRequired);
  const commission = parseAmount(reward);

  const remaining = Math.max(required - spent, 0);

  let badge = "Pending";
  let badgeColor = "bg-gray-100 text-gray-700";

  let title = "";
  let message = "";

  switch (String(status).toLowerCase()) {
    case "paid":
      badge = "Paid";
      badgeColor = "bg-green-100 text-green-700";

      title = "Reward Paid";

      message =
        commission > 0
          ? `Your referral reward of ${formatAmount(
              commission
            )} has been credited to your wallet.`
          : "This referral reward has been credited to your wallet.";

      break;

    case "qualified":
      badge = "Qualified";
      badgeColor = "bg-amber-100 text-amber-700";

      title = "Reward Ready";

      message =
        commission > 0
          ? `Congratulations! This referral qualified successfully. You can now withdraw ${formatAmount(
              commission
            )}.`
          : "Congratulations! This referral qualified successfully and is ready for withdrawal.";

      break;

    case "active":
      badge = "Active";
      badgeColor = "bg-blue-100 text-blue-700";

      title = "Still Qualifying";

      message =
        remaining > 0
          ? `The invited user has spent ${formatAmount(
              spent
            )}. They need ${formatAmount(
              remaining
            )} more to qualify.`
          : "The spending requirement has been completed.";

      break;

    case "expired":
      badge = "Expired";
      badgeColor = "bg-red-100 text-red-700";

      title = "Referral Expired";

      message =
        spent >= required
          ? "The referral met the spending requirement but expired before payment."
          : `The referral expired after spending ${formatAmount(
              spent
            )} of the required ${formatAmount(required)}.`;

      break;

    default:
      title = "Unknown Status";
      message = "Unable to determine the referral status.";
  }

  return (
    <div className="space-y-4">

      <span
        className={`
          inline-flex
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${badgeColor}
        `}
      >
        {badge}
      </span>

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {message}
        </p>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">
            Spent:
          </span>{" "}
          {formatAmount(spent)}
        </div>

        <div>
          <span className="font-medium">
            Required:
          </span>{" "}
          {formatAmount(required)}
        </div>
      </div>

      {commission > 0 && (
        <div className="text-sm text-gray-700">
          <span className="font-medium">
            Reward:
          </span>{" "}
          {formatAmount(commission)}
        </div>
      )}

      {expiry && (
        <p className="text-xs text-gray-500">
          Expires on{" "}
          {new Date(expiry).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

    </div>
  );
}


/*
function parseAmount(value) {
  const amount = Number(value ?? 0);

  return Number.isNaN(amount)
    ? 0
    : amount;
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function ReferralStatus({
  status,
  totalSpent,
  spendRequired,
}) {
  const spent = parseAmount(totalSpent);

  const required =
    parseAmount(spendRequired);

  const remaining = Math.max(
    required - spent,
    0
  );

  let badge = "Pending";
  let badgeColor =
    "bg-gray-100 text-gray-700";

  let title = "";
  let message = "";

  switch (
    String(status).toLowerCase()
  ) {
    case "paid":
      badge = "Paid";
      badgeColor =
        "bg-green-100 text-green-700";

      title = "Reward Paid";

      message =
        "This referral successfully met the spending requirement and the commission has been credited to your wallet.";

      break;

    case "active":
      badge = "Active";
      badgeColor =
        "bg-blue-100 text-blue-700";

      title = "Still Qualifying";

      message =
        remaining > 0
          ? `Waiting for the invited user to spend ${formatAmount(
              remaining
            )} more.`
          : "The spending requirement has been completed.";

      break;

    case "expired":
      badge = "Expired";
      badgeColor =
        "bg-red-100 text-red-700";

      title = "Referral Expired";

      message =
        spent >= required
          ? "The referral has expired."
          : "The referral expired before the spending requirement was completed.";

      break;

    default:
      title = "Unknown Status";

      message =
        "Unable to determine the referral status.";
  }

  return (
    <div className="space-y-3">

      <span
        className={`
          inline-flex
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${badgeColor}
        `}
      >
        {badge}
      </span>

      <div>

        <p className="font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {message}
        </p>

      </div>

    </div>
  );
}
*/