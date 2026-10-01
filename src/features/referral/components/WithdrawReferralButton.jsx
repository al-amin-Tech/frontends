// src/features/referral/components/WithdrawReferralButton.jsx

import { Button } from "../../../shared/components/ui";

export default function WithdrawReferralButton({
  balance = "0.00",
  mutation,
  onWithdraw,
}) {
  const canWithdraw =
    Number(balance) > 0;

  const submit = async (event) => {
    event.preventDefault();

    if (!canWithdraw) {
      return;
    }

    await onWithdraw?.();
  };

  return (
    <form onSubmit={submit}>
      <Button
        type="submit"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !canWithdraw
        }
      >
        {canWithdraw
          ? "Withdraw Commission"
          : "No Commission Available"}
      </Button>
    </form>
  );
}