import { ChevronRight } from "lucide-react";

import NotificationIcon from "./NotificationIcon";

export default function NotificationCard({
  notification,
  onClick,
}) {
  const {
    id,
    type,
    title,
    body,
    icon,
    metadata,
    is_read,
    created_at,
  } = notification;

  const unread =
    Number(is_read) === 0 ||
    is_read === false;

  const handleClick = () => {
    onClick?.(notification);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        unread
          ? "border-blue-100 bg-blue-50/60 dark:border-blue-900/50 dark:bg-blue-950/20"
          : "border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
      } hover:shadow-sm`}
    >
      <div className="flex items-start gap-3">

        <NotificationIcon
          icon={icon}
          type={type}
        />

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3
                className={`text-sm ${
                  unread
                    ? "font-bold text-gray-900 dark:text-white"
                    : "font-semibold text-gray-800 dark:text-gray-200"
                }`}
              >
                {title || "Notification"}
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-400">
                {body || ""}
              </p>

            </div>

            {unread && (
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"
                aria-label="Unread"
              />
            )}

          </div>

          <div className="mt-3 flex items-center justify-between gap-3">

            <span className="text-xs text-gray-400">
              {created_at
                ? new Date(
                    created_at
                  ).toLocaleString()
                : "-"}
            </span>

            {metadata?.purchaseRef && (
              <span className="max-w-[170px] truncate text-xs text-gray-400">
                {metadata.purchaseRef}
              </span>
            )}

            <ChevronRight
              size={17}
              className="shrink-0 text-gray-400"
            />

          </div>

        </div>

      </div>
    </button>
  );
}