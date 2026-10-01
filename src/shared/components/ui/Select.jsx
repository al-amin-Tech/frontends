

import { forwardRef } from "react";
import clsx from "clsx";

const Select = forwardRef(function Select(
  {
    label,
    options,
    placeholder = "Select an option",
    error,
    helperText,
    required = false,
    className = "",
    children,
    ...props
  },
  ref
) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <select
        ref={ref}
        className={clsx(
          "w-full rounded-lg border bg-white px-4 py-2.5",
          "transition duration-200",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          className
        )}
        {...props}
      >
        {/* Use children when provided */}
        {children ? (
          children
        ) : (
          <>
            <option value="">
              {placeholder}
            </option>

            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>

      {error ? (
        <p className="text-sm text-red-600">
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

export default Select;











/*


import { forwardRef } from "react";
import clsx from "clsx";

const Select = forwardRef(function Select(
  {
    label,
    options = [],
    placeholder = "Select an option",
    error,
    helperText,
    required = false,
    className = "",
    ...props
  },
  ref
) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <select
        ref={ref}
        className={clsx(
          "w-full rounded-lg border bg-white px-4 py-2.5",
          "transition duration-200",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          className
        )}
        {...props}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="text-sm text-red-600">
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

export default Select;

*/