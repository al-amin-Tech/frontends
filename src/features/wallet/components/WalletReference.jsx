import { useCallback } from "react";
import {
  Alert,
} from "../../../shared/components/ui";

export default function WalletReference({
  reference,
}) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reference);

      await Alert({
        type: "success",
        title: "Reference Copied",
        message:
          "Transaction reference copied successfully.",
      });
    } catch {
      await Alert({
        type: "error",
        title: "Copy Failed",
        message:
          "Unable to copy transaction reference.",
      });
    }
  }, [reference]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-4 flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-left transition hover:bg-gray-50"
    >
      <div>
        <p className="text-xs text-gray-500">
          Reference
        </p>

        <p className="mt-1 break-all font-mono text-sm">
          {reference}
        </p>
      </div>

      <span className="text-sm font-medium text-blue-600">
        Copy
      </span>
    </button>
  );
}