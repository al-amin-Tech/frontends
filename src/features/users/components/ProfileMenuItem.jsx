// src/features/users/components/ProfileMenuItem.jsx

import { ChevronRight } from "lucide-react";

export default function ProfileMenuItem({
  icon: Icon,
  title,
  description,
  right,
  danger = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        bg-white
        p-4
        text-left
        shadow-sm
        transition-all
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-blue-50
          text-blue-600
          shrink-0
        "
      >
        {Icon && <Icon size={22} />}
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`
            font-semibold
            ${
              danger
                ? "text-red-600"
                : "text-gray-900"
            }
          `}
        >
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {right ? (
        right
      ) : (
        <ChevronRight
          size={20}
          className="text-gray-400"
        />
      )}
    </button>
  );
}