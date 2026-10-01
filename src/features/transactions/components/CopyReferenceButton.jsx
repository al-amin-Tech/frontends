import {
  Button,
  Alert,
} from "../../../shared/components/ui";

export default function CopyReferenceButton({
  reference,
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        reference
      );

      await Alert({
        type: "success",
        title: "Copied",
        message:
          "Transaction reference copied successfully.",
      });
    } catch {
      await Alert({
        type: "error",
        title: "Copy Failed",
        message:
          "Unable to copy the transaction reference.",
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">

      <span className="break-all font-mono text-sm">
        {reference}
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
      >
        Copy
      </Button>

    </div>
  );
}