import {
  Button,
} from "../../../shared/components/ui";

export default function ReceiptActions({
  onDownload,
  onPrint,
  onShare,
  downloading = false,
  printing = false,
  sharing = false,
}) {
  return (
    <div className="space-y-3">

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={onDownload}
        loading={downloading}
        disabled={downloading}
      >
        Download Receipt
      </Button>

      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={onPrint}
        loading={printing}
        disabled={printing}
      >
        Print Receipt
      </Button>

      <Button
        type="button"
        fullWidth
        onClick={onShare}
        loading={sharing}
        disabled={sharing}
      >
        Share Receipt
      </Button>

    </div>
  );
}