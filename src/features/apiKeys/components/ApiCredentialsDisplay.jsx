import { useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export default function ApiCredentialsDisplay({
  credentials,
}) {
  const [showSecret, setShowSecret] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState("");

  if (!credentials) return null;

  const copy = async (value, field) => {
    if (!value) return;

    await navigator.clipboard.writeText(value);

    setCopied(field);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  const apiKey =
    credentials.apiKey ??
    credentials.api_key ??
    null;

  const apiSecret =
    credentials.apiSecret ??
    credentials.api_secret ??
    null;

  const mask = (value) => {
    if (!value) return "Not available";

    if (value.length <= 8) {
      return "••••••••";
    }

    return `${value.slice(0, 4)}••••••••${value.slice(-4)}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <KeyRound className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Your API Credentials
          </h2>

          <p className="text-xs text-slate-500">
            Keep these credentials secure.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {apiKey && (
          <Credential
            label="API Key"
            value={showKey ? apiKey : mask(apiKey)}
            rawValue={apiKey}
            visible={showKey}
            onToggle={() =>
              setShowKey((current) => !current)
            }
            onCopy={() =>
              copy(apiKey, "apiKey")
            }
            copied={copied === "apiKey"}
          />
        )}

        {apiSecret && (
          <Credential
            label="API Secret"
            value={showSecret ? apiSecret : mask(apiSecret)}
            rawValue={apiSecret}
            visible={showSecret}
            onToggle={() =>
              setShowSecret((current) => !current)
            }
            onCopy={() =>
              copy(apiSecret, "apiSecret")
            }
            copied={copied === "apiSecret"}
            sensitive
          />
        )}
      </div>

      <div className="mt-5 flex gap-3 rounded-xl bg-amber-500/10 p-3">
        <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />

        <p className="text-xs leading-5 text-amber-700 dark:text-amber-400">
          Never share your API secret or place it inside
          client-side JavaScript, mobile applications, or
          public repositories.
        </p>
      </div>
    </div>
  );
}

function Credential({
  label,
  value,
  visible,
  onToggle,
  onCopy,
  copied,
  sensitive = false,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
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
          {value}
        </code>

        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
          aria-label={
            visible ? "Hide credential" : "Show credential"
          }
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
          aria-label="Copy credential"
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