// src/features/more/components/MoreMenuItem.jsx

import { ChevronRight } from "lucide-react";

export default function MoreMenuItem({
  title,
  subtitle,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        flex
        items-center
        justify-between
        rounded-2xl
        bg-white
        border
        border-gray-100
        p-4
        shadow-sm
        active:scale-[0.98]
        transition
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            text-white
          "
        >
          <Icon size={22} />
        </div>

        <div className="text-left">

          <h3 className="font-semibold text-gray-900">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          )}

        </div>

      </div>

      <ChevronRight
        size={20}
        className="text-gray-400"
      />
    </button>
  );
}