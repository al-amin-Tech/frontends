import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useProfile } from "../../../features/users/hooks/useProfile";
import ROUTES from "../../../shared/constants/routes";

export default function Header() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { data } = useProfile();

  const firstName =
    user?.full_name?.split(" ")[0] || "User";

  const unreadCount = Number(
    data?.unreadCount ?? 0
  );

  const handleNotificationClick = () => {
    navigate(ROUTES.NOTIFICATIONS_EVEVT);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-4
        shadow-sm
        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      <div className="flex items-center gap-3">
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
              firstName
            )}`
          }
          alt={firstName}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hi,{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {firstName}
            </span>{" "}
            👋
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleNotificationClick}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        className="
          relative
          rounded-xl
          bg-blue-700
          p-3
          text-white
          transition
          hover:bg-blue-800
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          dark:focus:ring-offset-gray-950
        "
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-xs
              font-semibold
              text-white
            "
          >
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>
    </header>
  );
}


/*
import { Bell } from "lucide-react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useProfile } from "../../../features/users/hooks/useProfile";

export default function Header({
  onNotificationClick = () => {},
}) {
  const { user } = useAuth();
  const { data } = useProfile();

  const firstName =
    user?.full_name?.split(" ")[0] || "User";

  const unreadCount = data?.unreadCount ?? 0;

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-4
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?background=2563eb&color=fff&name=${encodeURIComponent(
              firstName
            )}`
          }
          alt={firstName}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="text-sm text-gray-500">
            Hi, <span className="font-semibold">{firstName}</span> 👋
          </p>
        </div>
      </div>

      <button
        onClick={onNotificationClick}
        className="
          relative
          rounded-xl
          bg-blue-700
          p-3
          text-white
          transition
          hover:bg-blue-800
        "
      >
        <Bell size={20} />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-red-500
            text-xs
            text-white
          "
        >
          {unreadCount}
        </span>
      </button>
    </header>
  );
}
*/