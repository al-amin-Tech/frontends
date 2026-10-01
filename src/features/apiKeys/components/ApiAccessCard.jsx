import {
  ShieldCheck,
  ShieldOff,
} from "lucide-react";

export default function ApiAccessCard({
  status,
  loading = false,
  onEnable,
  onDisable,
}) {
 const isActive = status === "active";
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">

          <div
            className={[
              "flex h-11 w-11 items-center justify-center rounded-xl",
              isActive
                ? "bg-emerald-500/10"
                : "bg-red-500/10",
            ].join(" ")}
          >
            {isActive ? (
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            ) : (
              <ShieldOff className="h-5 w-5 text-red-500" />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              API Access
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Control access to your API credentials.
            </p>
          </div>
        </div>

        <div
          className={[
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
            isActive
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-red-500/10 text-red-600",
          ].join(" ")}
        >
          <span
            className={[
              "h-2 w-2 rounded-full",
              isActive
                ? "bg-emerald-500"
                : "bg-red-500",
            ].join(" ")}
          />

          {isActive ? "Active" : "Disabled"}
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {isActive
            ? "Your API credentials are active. Requests authenticated with your credentials can access the API."
            : "Your API credentials are disabled. Requests using these credentials will be rejected until you enable API access again."}
        </p>
      </div>

      {/* Explicit action area */}
      <div className="mt-5">
        {isActive ? (
          <button
            type="button"
            onClick={onDisable}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <ShieldOff className="mr-2 h-4 w-4" />

            {loading
              ? "Disabling API Access..."
              : "Disable API Access"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onEnable}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldCheck className="mr-2 h-4 w-4" />

            {loading
              ? "Enabling API Access..."
              : "Enable API Access"}
          </button>
        )}
      </div>
    </div>
  );
}



