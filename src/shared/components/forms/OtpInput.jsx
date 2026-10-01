



import { Controller } from "react-hook-form";
import { useRef } from "react";

export default function OtpInput({
  control,
  name,
  length = 6,
  disabled = false,
  error,
}) {
  const inputsRef = useRef([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const digits = Array.from(
          { length },
          (_, index) => field.value[index] || ""
        );

        const handleChange = (index, inputValue) => {
          const digit = inputValue
            .replace(/\D/g, "")
            .slice(-1);

          const values = [...digits];

          values[index] = digit;

          field.onChange(values.join(""));

          if (
            digit &&
            index < length - 1
          ) {
            inputsRef.current[index + 1]?.focus();
          }
        };

        return (
          <div>
            <div className="flex justify-between gap-2">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  value={digit}
                  maxLength={1}
                  disabled={disabled}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleChange(
                      index,
                      e.target.value
                    )
                  }
                  className="h-12 w-11 rounded-lg border text-center text-lg"
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
