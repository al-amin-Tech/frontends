// src/shared/components/purchase/TransactionPinModal.jsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import ValidationAlert from "./components/ValidationAlert";
import PinInput from "../forms/PinInput";

export default function TransactionPinModal({
  open,
  loading = false,
  error = "",
  title = "Transaction PIN",
  description = "Enter your 4-digit transaction PIN to continue.",
  onClose,
  onSubmit,
  onErrorChange,
}) {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!open) {
      setPin("");
      onErrorChange?.("");
    }
  }, [open, onErrorChange]);

  if (!open) {
    return null;
  }

  function handleChange(event) {
    const value = event.target.value;

    setPin(value);

    if (error) {
      onErrorChange?.("");
    }
  }

  function handleSubmit() {
    if (pin.length !== 4 || loading) {
      return;
    }

    onSubmit?.(pin);
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          shadow-xl
        "
      >
        <div className="border-b p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <ValidationAlert
            success={false}
            message={error}
          />

          <PinInput
            autoFocus
            value={pin}
            placeholder="****"
            onChange={handleChange}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                pin.length === 4 &&
                !loading
              ) {
                handleSubmit();
              }
            }}
            className="tracking-[14px] text-3xl"
          />

          <button
            type="button"
            disabled={
              loading ||
              pin.length !== 4
            }
            onClick={handleSubmit}
            className="
              w-full
              rounded-2xl
              bg-blue-600
              py-4
              font-semibold
              text-white
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Processing..."
              : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}






/*
// src/shared/components/purchase/TransactionPinModal.jsx

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import  ValidationAlert from "./components/ValidationAlert";

export default function TransactionPinModal({
  open,
  loading = false,
  error = "",
  title = "Transaction PIN",
  description = "Enter your 4-digit transaction PIN to continue.",
  onClose,
  onSubmit,
  onErrorChange,
}) {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (!open) {
      setPin("");
      onErrorChange?.("");
    }
  }, [open, onErrorChange]);

  if (!open) return null;

  function handleChange(event) {
    const value = event.target.value.replace(/\D/g, "");

    setPin(value);

    if (error) {
      onErrorChange?.("");
    }
  }

  function handleSubmit() {
    if (pin.length !== 4 || loading) {
      return;
    }

    onSubmit?.(pin);
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          shadow-xl
        "
      >
        <div className="border-b p-6">

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-xl font-bold">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>

            </div>

            <button
              type="button"
              onClick={onClose}
            >
              <X size={22} />
            </button>

          </div>

        </div>

        <div className="space-y-5 p-6">

          <ValidationAlert
            success={false}
            message={error}
          />

          <input
            type="password"
            inputMode="numeric"
            autoFocus
            maxLength={4}
            value={pin}
            placeholder="****"
            onChange={handleChange}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                pin.length === 4 &&
                !loading
              ) {
                handleSubmit();
              }
            }}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              px-4
              py-4
              text-center
              text-3xl
              tracking-[14px]
              outline-none
              focus:border-blue-600
            "
          />

          <button
            type="button"
            disabled={
              loading ||
              pin.length !== 4
            }
            onClick={handleSubmit}
            className="
              w-full
              rounded-2xl
              bg-blue-600
              py-4
              font-semibold
              text-white
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Processing..."
              : "Purchase"}
          </button>

        </div>

      </div>
    </div>
  );
}


*/