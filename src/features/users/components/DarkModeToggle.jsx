// src/features/users/components/DarkModeToggle.jsx

import { Moon } from "lucide-react";

export default function DarkModeToggle({
  enabled = false,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!enabled)}
      className="
        flex
        items-center
        gap-3
      "
    >
      <Moon
        size={18}
        className={
          enabled
            ? "text-yellow-500"
            : "text-gray-400"
        }
      />

      <div
        className={`
          relative
          h-7
          w-12
          rounded-full
          transition-colors
          ${
            enabled
              ? "bg-blue-600"
              : "bg-gray-300"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transition-transform
            ${
              enabled
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </div>
    </button>
  );
}