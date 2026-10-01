// src/shared/components/forms/FormField.jsx

import clsx from "clsx";

export default function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
  className = "",
}) {
  return (
    <div className={clsx("space-y-1.5", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
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
}







/*










import { Controller, useFormContext } from 'react-hook-form';

import Input from '../ui/Input';
import PasswordInput from './PasswordInput';

/**
 * Universal form field.
 *
 * Automatically connects to React Hook Form
 * using FormProvider + useFormContext().
 *

export default function FormField({
  name,

  label,

  type = 'text',

  component,

  placeholder,

  autoComplete,

  disabled = false,

  readOnly = false,

  ...props
}) {
  const { control } = useFormContext();

  const Component =
    component ??
    (type === 'password'
      ? PasswordInput
      : Input);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Component
          {...field}
          {...props}

          type={type}
          label={label}
          placeholder={placeholder}
          autoComplete={autoComplete}

          disabled={disabled}
          readOnly={readOnly}

          error={fieldState.error?.message}
        />
      )}
    />
  );
}
*/