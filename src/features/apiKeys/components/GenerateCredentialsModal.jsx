import { AlertTriangle, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import ApiAuthModeSelector from "./ApiAuthModeSelector.jsx";

const DEFAULT_AUTH_MODE = "signature";

export default function GenerateCredentialsModal({
  open,
  loading = false,
  currentMode = null,
  onClose,
  onSubmit,
}) {
  const titleId = useId();
  const descriptionId = useId();

  const [selectedMode, setSelectedMode] = useState(
    currentMode ?? DEFAULT_AUTH_MODE
  );

  const [isConfirming, setIsConfirming] = useState(false);

  /**
   * Reset internal state whenever the modal is opened.
   * This prevents the confirmation screen or old mode from
   * persisting between open/close cycles.
   */
  useEffect(() => {
    if (!open) return;

    setSelectedMode(currentMode ?? DEFAULT_AUTH_MODE);
    setIsConfirming(false);
  }, [open, currentMode]);

  /**
   * Optional but recommended:
   * Close modal or go back with Escape key.
   */
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || loading) return;

      if (isConfirming) {
        setIsConfirming(false);
        return;
      }

      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading, isConfirming, onClose]);

  if (!open) return null;

  const handleCloseClick = () => {
    if (loading) return;
    onClose();
  };

  const handleBackClick = () => {
    if (loading) return;
    setIsConfirming(false);
  };

  const handleConfirmGenerate = () => {
    if (loading) return;
    onSubmit(selectedMode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 pb-24 sm:items-center sm:pb-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="max-h-[calc(100vh-7rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900 sm:max-h-[90vh]">
        {!isConfirming ? (
          <>
            {/* Step 1: Choose authentication mode */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  Choose Authentication Method
                </h2>

                <p
                  id={descriptionId}
                  className="mt-1 text-sm leading-5 text-slate-500"
                >
                  Read the documentation for each method before choosing how
                  your API requests will be authenticated.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseClick}
                disabled={loading}
                aria-label="Close"
                className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5">
              <ApiAuthModeSelector
                value={selectedMode}
                onChange={setSelectedMode}
              />
            </div>

            <div className="mt-5 flex gap-3 pb-2">
              <button
                type="button"
                onClick={handleCloseClick}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setIsConfirming(true)}
                disabled={loading || !selectedMode}
                className="flex-[1.35] rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                Generate Credentials
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Confirm secret creation */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className="h-5 w-5 text-amber-500"
                    aria-hidden="true"
                  />

                  <h2
                    id={titleId}
                    className="text-lg font-bold text-slate-900 dark:text-white"
                  >
                    Confirm secret creation
                  </h2>
                </div>

                <p
                  id={descriptionId}
                  className="mt-1 text-sm leading-5 text-slate-500"
                >
                  Are you sure you want to create a new secret? This will
                  generate new credentials for your API access.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBackClick}
                disabled={loading}
                aria-label="Back"
                className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              Please confirm before continuing. If this replaces an existing
              secret, make sure your applications are ready to use the new
              credentials.
            </div>

            <div className="mt-5 flex gap-3 pb-2">
              <button
                type="button"
                onClick={handleBackClick}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirmGenerate}
                disabled={loading}
                className="flex-[1.35] rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {loading ? "Generating..." : "Yes, create secret"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}







/*
import { X } from "lucide-react";
import { useState } from "react";

import ApiAuthModeSelector from "./ApiAuthModeSelector.jsx";

export default function GenerateCredentialsModal({
  open,
  loading = false,
  currentMode = null,
  onClose,
  onSubmit,
}) {
  const [selectedMode, setSelectedMode] = useState(
    currentMode || "signature"
  );

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(selectedMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 pb-24 sm:items-center sm:pb-4">
      <div className="max-h-[calc(100vh-7rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900 sm:max-h-[90vh]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Choose Authentication Method
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Read the documentation for each method before
              choosing how your API requests will be authenticated.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          <ApiAuthModeSelector
            value={selectedMode}
            onChange={setSelectedMode}
          />
        </div>

        <div className="mt-5 flex gap-3 pb-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !selectedMode}
            className="flex-[1.35] rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Generating..." : "Generate Credentials"}
          </button>
        </div>
      </div>
    </div>
  );
}

*/