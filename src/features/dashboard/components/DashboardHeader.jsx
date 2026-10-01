// src/features/dashboard/components/DashboardHeader.jsx

import { Bell } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

export default function DashboardHeader({
  onNotificationClick,
}) {
  const { user } = useAuth();

  const firstName =
    user?.full_name?.split(" ")[0] || "User";

  return (
    <header className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <img
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?background=2563eb&color=fff&name=" +
              encodeURIComponent(firstName)
          }
          alt={firstName}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>

          <p className="text-sm text-gray-500">
            Hello,
            <span className="font-semibold">
              {" "}
              {firstName}
            </span>
            👋
          </p>

          <h2 className="text-2xl font-bold">
            Hi!
          </h2>

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
          hover:bg-blue-700
        "
      >

        <Bell size={22} />

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
          0
        </span>

      </button>

    </header>
  );
}