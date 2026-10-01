// src/shared/components/ui/Textarea.jsx

import { forwardRef } from "react";
import clsx from "clsx";

const Textarea = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "w-full rounded-lg border border-gray-300 px-3 py-2",
          "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:cursor-not-allowed disabled:bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
