import { Card } from "../../../shared/components/ui";
import  formatAmount  from "../utils/formatAmount";
import ReceiptRow from "./ReceiptRow";
import ReceiptStatusBadge from "./ReceiptStatusBadge";
import CopyReferenceButton from "./CopyReferenceButton";
import ReceiptActions from "./ReceiptActions";

export default function PurchaseReceipt({
  details,
  onDownload,
  onPrint,
  onShare,
}) {
  return (
    <Card className="space-y-6">

      <div className="text-center">

       <div className="text-3xl">
          {details.status === "success"
             ? "✅"
             : details.status === "reversed"
             ? "🔄"
             : ""}
         </div>


        <h2 className="mt-2 text-xl font-bold">
          Purchase Receipt
        </h2>

        <p className="mt-1 text-2xl font-bold">
          {formatAmount(details.amount)}
        </p>

      </div>

      <div>

        <ReceiptRow
          label="Provider"
          value={details.network.toUpperCase()}
        />

        <ReceiptRow
          label="Recipient"
          value={details?.recipient.toString().toUpperCase()}
        />

        {details?.quantity > 0 && ( <ReceiptRow
          label="quantity"
          value={details?.quantity}
        /> )}

        <ReceiptRow
          label="Plan Type"
          value={details?.plan_type.toUpperCase()}
        />

        <ReceiptRow
          label="Category"
          value={details?.category.toUpperCase()}
        />

        <ReceiptRow label="Status">
          <ReceiptStatusBadge
            status={details?.status}
          />
        </ReceiptRow>

        <ReceiptRow label="Reference">
          <CopyReferenceButton
            reference={details?.reference}
          />
        </ReceiptRow>

        <ReceiptRow
          label="Date"
          value={new Date(
            details.created_at
          ).toLocaleString()}
        />

      </div>

      <ReceiptActions
        onDownload={onDownload}
        onPrint={onPrint}
        onShare={onShare}
      />

    </Card>
  );
}