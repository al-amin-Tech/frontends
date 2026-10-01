// src/shared/components/ui/PageLoader.jsx

import { Loader2 } from "lucide-react";

export default function PageLoader({
  title = "Loading...",
  description = "Please wait while we prepare your data.",
  fullScreen = false,
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-4
        rounded-xl
        bg-white
        px-6
        py-16
        text-center
        ${
          fullScreen
            ? "min-h-screen"
            : "min-h-[320px]"
        }
      `}
    >
      <Loader2
        size={42}
        className="animate-spin text-blue-600"
      />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}