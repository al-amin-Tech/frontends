// src/features/referral/components/ReferralCodeCard.jsx

import { Copy, Share2 } from "lucide-react";
import { Button, Alert } from "../../../shared/components/ui";

export default function ReferralCodeCard({
  referralCode,
}) {
  const copyCode = async () => {
    if (!referralCode) return;

    try {
      await navigator.clipboard.writeText(
        referralCode
      );

      await Alert({
        type: "success",
        title: "Copied",
        message:
          "Referral code copied successfully.",
      });
    } catch {
      await Alert({
        type: "error",
        title: "Copy Failed",
        message:
          "Unable to copy referral code.",
      });
    }
  };

  const shareCode = async () => {
    if (!referralCode) return;

    const message = `Join our VTU Platform using my referral code:\n\n${referralCode}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Referral Invitation",
          text: message,
        });

        return;
      }

      await navigator.clipboard.writeText(message);

      await Alert({
        type: "success",
        title: "Copied",
        message:
          "Sharing is not supported on this device. Invitation copied instead.",
      });
    } catch {
      // User cancelled share
    }
  };

  return (
    <section
      className="
        rounded-2xl
        border
        bg-white
        p-5
        shadow-sm
      "
    >
      <h2 className="text-lg font-semibold">
        Your Referral Code
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Share this code with friends. You'll earn a
        commission when they qualify.
      </p>

      <div
        className="
          mt-5
          rounded-xl
          bg-gray-100
          p-4
          text-center
        "
      >
        <p className="break-all text-lg font-bold tracking-wider">
          {referralCode || "--"}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <Button
          type="button"
          variant="secondary"
          onClick={copyCode}
        >
          <Copy
            size={18}
            className="mr-2"
          />

          Copy
        </Button>

        <Button
          type="button"
          onClick={shareCode}
        >
          <Share2
            size={18}
            className="mr-2"
          />

          Share
        </Button>

      </div>
    </section>
  );
}