import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileKey,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { API_AUTH_DOCUMENTATION } from "./apiKeys.documentation.js";

const MODE_ICONS = {
  key: KeyRound,
  key_secret: ShieldCheck,
  signature: FileKey,
};

export default function ApiAuthModeSelector({
  value,
  onChange,
}) {
  const [expanded, setExpanded] = useState("key");

  return (
    <div className="space-y-3">
      {Object.entries(API_AUTH_DOCUMENTATION).map(
        ([mode, documentation]) => {
          const Icon = MODE_ICONS[mode];

          const isSelected = value === mode;
          const isExpanded = expanded === mode;

          return (
            <div
              key={mode}
              className={[
                "overflow-hidden rounded-2xl border transition",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(mode);
                  setExpanded(
                    isExpanded ? null : mode
                  );
                }}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {documentation.title}
                    </h3>

                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {documentation.shortDescription}
                  </p>
                </div>

                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 px-4 pb-4 pt-4 dark:border-slate-800">
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {documentation.description}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      How it works
                    </p>

                    <ol className="mt-2 space-y-2">
                      {documentation.howItWorks.map(
                        (step, index) => (
                          <li
                            key={step}
                            className="flex gap-3 text-xs leading-5 text-slate-600 dark:text-slate-300"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                              {index + 1}
                            </span>

                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ol>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Recommended for
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {documentation.bestFor}
                    </p>
                  </div>

                  <div className="mt-3 rounded-xl bg-amber-500/10 p-3">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      Security
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-400/80">
                      {documentation.security}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}