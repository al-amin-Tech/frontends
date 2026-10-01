// src/features/notifications/components/NotificationSettingsCard.jsx

import { Bell } from "lucide-react";

export default function NotificationSettingsCard({
  enabled,
  loading,
  onChange,
}) {
  return (
    <section
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4">

          <div
            className="
              rounded-xl
              bg-blue-100
              p-3
              text-blue-600
            "
          >
            <Bell size={22} />
          </div>

          <div>

            <h2 className="font-semibold text-lg">
              Push Notifications
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Receive notifications about wallet
              funding, purchases, referral rewards,
              security alerts and important account
              updates.
            </p>

          </div>

        </div>

        <label className="relative inline-flex cursor-pointer">

          <input
            type="checkbox"
            checked={enabled}
            disabled={loading}
            onChange={(event) =>
              onChange?.(
                event.target.checked
              )
            }
            className="peer sr-only"
          />

          <div
            className="
              h-7
              w-12
              rounded-full
              bg-gray-300
              transition
              peer-checked:bg-blue-600
            "
          />

          <div
            className="
              absolute
              left-1
              top-1
              h-5
              w-5
              rounded-full
              bg-white
              transition-all
              peer-checked:left-6
            "
          />

        </label>

      </div>
    </section>
  );
}