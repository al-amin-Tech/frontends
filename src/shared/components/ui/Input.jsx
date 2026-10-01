import clsx from "clsx";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    className = "",
    required,
    leftIcon,
    rightIcon,
    ...props
  },
  ref
) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-base font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full rounded-3xl bg-blue-50 p-2">
        {leftIcon && (
          <div
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-blue-600
              text-white
            "
          >
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={clsx(
            "w-full rounded-2xl border border-blue-200 bg-white py-4",
            "text-sm text-gray-700 shadow-sm outline-none",
            "focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
            leftIcon ? "pl-14" : "pl-5",
            rightIcon ? "pr-16" : "pr-5",
            error && "border-red-500 focus:ring-red-100",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-500">
          {error}
        </p>
      ) : (
        helperText && (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
});

export default Input;



/*

text-xs   → Extra small
text-sm   → Small
text-base  → Normal/default size
text-lg   → Large
text-xl   → Extra large
text-2xl  → Very large
*/