// src/features/settings/components/ContactCard.jsx

import {
  ChevronRight,
} from "lucide-react";

import {
  Card,
} from "../../../shared/components/ui";

export default function ContactCard({
  title,
  subtitle,
  icon: Icon,
  value,
  href,
  disabled = false,
  onClick,
}) {
  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick();
      return;
    }

    if (!href) return;

    window.open(
      href,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Card
      onClick={handleClick}
      className={`
        transition
        ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer hover:border-blue-500"
        }
      `}
    >
      <div className="flex items-center gap-4">

        {Icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-blue-600
              dark:bg-blue-900/30
              dark:text-blue-400
            "
          >
            <Icon size={22} />
          </div>
        )}

        <div className="flex-1">

          <h3 className="font-semibold">
            {title}
          </h3>

          {subtitle && (
            <p
              className="
                mt-1
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {subtitle}
            </p>
          )}

          {value && (
            <p
              className="
                mt-2
                break-all
                text-sm
                font-medium
                text-blue-600
                dark:text-blue-400
              "
            >
              {/*{value} */}
            </p>
          )}

        </div>

        {!disabled && (
          <ChevronRight
            size={18}
            className="text-gray-400"
          />
        )}

      </div>
    </Card>
  );
}