// src/shared/components/forms/PinInput.jsx

import {
  forwardRef,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export const PinInput = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      disabled = false,
      placeholder = "••••",
      autoComplete = "off",
      className = "",
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPin, setShowPin] = useState(false);

    const handleChange = (event) => {
      let value = event.target.value;

      // Keep only digits
      value = value.replace(/\D/g, "");

      // Maximum 4 digits
      value = value.slice(0, 4);

      event.target.value = value;

      onChange?.(event);
    };

    return (
      <div className="space-y-2">

        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              flex
              items-center
              pl-3
            "
          >
            <ShieldCheck
              size={18}
              className="text-gray-400"
            />
          </div>

          <input
            ref={ref}
            type={showPin ? "text" : "password"}
            inputMode="numeric"
            autoComplete={autoComplete}
            placeholder={placeholder}
            maxLength={4}
            disabled={disabled}
            onChange={handleChange}
            className={`
              w-full
              rounded-xl
              border
              bg-white
              py-3
              pl-10
              pr-12
              text-center
              text-lg
              tracking-[0.6em]
              outline-none
              transition

              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-600"
              }

              ${
                disabled
                  ? "cursor-not-allowed bg-gray-100"
                  : ""
              }

              ${className}
            `}
            {...props}
          />

          <button
            type="button"
            tabIndex={-1}
            onClick={() =>
              setShowPin((prev) => !prev)
            }
            className="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-3
              text-gray-500
              hover:text-gray-700
            "
          >
            {showPin ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {helperText && !error && (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

      </div>
    );
  }
);

PinInput.displayName = "PinInput";

export default PinInput;