// src/features/users/components/ProfileHeader.jsx

import { UserCircle2 } from "lucide-react";

export default function ProfileHeader({
  user = {},
}) {
  const {
    full_name = "User",
    email = "",
    role = "Customer",
  } = user;

  const initials = full_name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        bg-white
        p-5
        shadow-sm
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-blue-600
          text-xl
          font-bold
          text-white
          overflow-hidden
        "
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={full_name}
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          initials
        ) : (
          <UserCircle2 size={40} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h1
          className="
            truncate
            text-xl
            font-bold
            text-gray-900
          "
        >
          {full_name}
        </h1>

        <p
          className="
            truncate
            text-sm
            text-gray-500
          "
        >
          {email}
        </p>

        <span
          className="
            mt-2
            inline-flex
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-semibold
            text-blue-700
          "
        >
          {role.replace("_", " ").toUpperCase()}
        </span>
      </div>
    </section>
  );
}