// src/features/membership/components/UpgradeCard.jsx

import { Badge, Card } from "../../../shared/components/ui";

export default function UpgradeCard({
  currentRole,
}) {
  const formatRole = (role = "") =>
    role
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  return (
    <Card>

      <div className="space-y-3">

        <div>

          <h2 className="text-lg font-semibold">
            Current Membership
          </h2>

          <p className="text-sm text-gray-500">
            Your current account level.
          </p>

        </div>

        <Badge
          variant="primary"
          size="lg"
        >
          {formatRole(currentRole)}
        </Badge>

      </div>

    </Card>
  );
}