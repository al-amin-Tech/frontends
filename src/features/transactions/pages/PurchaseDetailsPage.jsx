import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import  formatAmount  from "../utils/formatAmount";

import {
  Alert,
  PageLoader,
} from "../../../shared/components/ui";

import ROUTES from "../../../shared/constants/routes";
import PurchaseReceipt from "../components/PurchaseReceipt";
import { usePurchaseDetails } from "../hooks/usePurchaseDetails";

export default function PurchaseDetailsPage() {
  const navigate = useNavigate();

  const { reference } = useParams();
  
  const {
    data,
    isLoading,
    error,
    refetch,
  } = usePurchaseDetails(reference);

  const details = data;

  const handleDownload = useCallback(async () => {
    try {
      const receipt = `
============================

PURCHASE RECEIPT

============================

Amount:
${formatAmount(details.amount)}

Provider:
${details.network.toUpperCase()}

Recipient:
${details.recipient}

Plan:
${details.plan_name}

Plan Type:
${details.plan_type}

Category:
${details.category}

Status:
${details.status}

Reference:
${details.reference}

Date:
${new Date(
  details.created_at
).toLocaleString()}

============================
`;

      const blob = new Blob(
        [receipt],
        {
          type: "text/plain;charset=utf-8",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `Receipt-${details.reference}.txt`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      await Alert({
        type: "success",
        title: "Receipt Downloaded",
        message:
          "Your receipt has been downloaded.",
      });
    } catch (error) {
      await Alert({
        type: "error",
        title: "Download Failed",
        message:
          error?.message ??
          "Unable to download receipt.",
      });
    }
  }, [details]);

  const handlePrint = useCallback(async () => {
    try {
      window.print();
    } catch {
      await Alert({
        type: "error",
        title: "Print Failed",
        message:
          "Unable to print this receipt.",
      });
    }
  }, []);

  const handleShare = useCallback(async () => {
    try {
      const shareText = `Purchase Receipt

Amount: ${formatAmount(details.amount)}

Provider: ${details.network.toUpperCase()}

Recipient: ${details.recipient}

Reference: ${details.reference}

Status: ${details.status}
`;

      if (navigator.share) {
        await navigator.share({
          title: "Purchase Receipt",
          text: shareText,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareText
      );

      await Alert({
        type: "success",
        title: "Copied",
        message:
          "Receipt copied to clipboard.",
      });
    } catch (error) {
      await Alert({
        type: "error",
        title: "Share Failed",
        message:
          error?.message ??
          "Unable to share receipt.",
      });
    }
  }, [details]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 pb-24">

        <div>

          <h1 className="text-2xl font-bold">
            Purchase Receipt
          </h1>

          <p className="mt-2 text-gray-500">
            Unable to load this purchase.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={refetch}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Try Again
          </button>

          <button
            onClick={() =>
              navigate(
                ROUTES.TRANSACTIONS
              )
            }
            className="rounded-lg border px-4 py-2"
          >
            Back
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-24">

      <div>

        <h1 className="text-2xl font-bold">
          Purchase Receipt
        </h1>

        <p className="mt-2 text-gray-500">
          View your completed purchase.
        </p>

      </div>

      <PurchaseReceipt
        details={details}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onShare={handleShare}
      />

    </div>
  );
}