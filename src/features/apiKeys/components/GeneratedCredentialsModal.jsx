import { useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  ShieldAlert,
  X,
} from "lucide-react";

export default function GeneratedCredentialsModal({
  open,
  credentials,
  onClose,
}) {
  const [showSecret, setShowSecret] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState("");

  if (!open || !credentials) {
    return null;
  }

  const apiKey = credentials.apiKey;
  const apiSecret = credentials.apiSecret;
  const authMode = credentials.authMode;

  const copy = async (value, field) => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(field);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 pb-24 sm:items-center sm:pb-4">
      <div className="max-h-[calc(100vh-7rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900 sm:max-h-[90vh]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Credentials Generated
              </h2>

              <p className="text-xs text-slate-500">
                Authentication:{" "}
                <span className="font-semibold capitalize">
                  {authMode?.replace("_", " + ")}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {apiKey && (
            <CredentialField
              label="API Key"
              value={apiKey}
              visible={showKey}
              onToggle={() =>
                setShowKey((value) => !value)
              }
              onCopy={() =>
                copy(apiKey, "apiKey")
              }
              copied={copied === "apiKey"}
            />
          )}

          {apiSecret && (
            <CredentialField
              label="API Secret"
              value={apiSecret}
              visible={showSecret}
              onToggle={() =>
                setShowSecret((value) => !value)
              }
              onCopy={() =>
                copy(apiSecret, "apiSecret")
              }
              copied={copied === "apiSecret"}
              sensitive
            />
          )}
        </div>

        <div className="mt-5 flex gap-3 rounded-xl bg-amber-500/10 p-4">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500" />

          <div>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Important security notice
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-400/80">
              Store these credentials securely. Never expose your
              API secret in browser code, mobile applications,
              screenshots, or public repositories.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          I've Saved My Credentials
        </button>
      </div>
    </div>
  );
}

function CredentialField({
  label,
  value,
  visible,
  onToggle,
  onCopy,
  copied,
  sensitive = false,
}) {
  const displayValue = visible
    ? value
    : "••••••••••••••••••••";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">
          {label}
          {sensitive && (
            <span className="ml-1 text-amber-500">
              (Sensitive)
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
        <code className="min-w-0 flex-1 break-all text-xs text-slate-700 dark:text-slate-200">
          {displayValue}
        </code>

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide value" : "Show value"}
          className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy value"}
          className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}



/*

import { useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  ShieldAlert,
  X,
} from "lucide-react";

export default function GeneratedCredentialsModal({
  open,
  credentials,
  onClose,
}) {
  const [showSecret, setShowSecret] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState("");

  if (!open || !credentials) {
    return null;
  }

  const apiKey = credentials.apiKey;
  const apiSecret = credentials.apiSecret;
  const authMode = credentials.authMode;

  const copy = async (value, field) => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(field);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Credentials Generated
              </h2>

              <p className="text-xs text-slate-500">
                Authentication:{" "}
                <span className="font-semibold capitalize">
                  {authMode?.replace("_", " + ")}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {apiKey && (
            <CredentialField
              label="API Key"
              value={apiKey}
              visible={showKey}
              onToggle={() =>
                setShowKey((value) => !value)
              }
              onCopy={() =>
                copy(apiKey, "apiKey")
              }
              copied={copied === "apiKey"}
            />
          )}

          {apiSecret && (
            <CredentialField
              label="API Secret"
              value={apiSecret}
              visible={showSecret}
              onToggle={() =>
                setShowSecret((value) => !value)
              }
              onCopy={() =>
                copy(apiSecret, "apiSecret")
              }
              copied={copied === "apiSecret"}
              sensitive
            />
          )}
        </div>

        <div className="mt-5 flex gap-3 rounded-xl bg-amber-500/10 p-4">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500" />

          <div>
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Important security notice
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-400/80">
              Store these credentials securely. Never expose your
              API secret in browser code, mobile applications,
              screenshots, or public repositories.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          I've Saved My Credentials
        </button>
      </div>
    </div>
  );
}

function CredentialField({
  label,
  value,
  visible,
  onToggle,
  onCopy,
  copied,
  sensitive = false,
}) {
  const displayValue = visible
    ? value
    : "••••••••••••••••••••";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">
          {label}
          {sensitive && (
            <span className="ml-1 text-amber-500">
              (Sensitive)
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
        <code className="min-w-0 flex-1 break-all text-xs text-slate-700 dark:text-slate-200">
          {displayValue}
        </code>

        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>

        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}*/