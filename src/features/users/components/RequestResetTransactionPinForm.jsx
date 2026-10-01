// src/features/users/components/RequestResetTransactionPinForm.jsx

import { Button } from "../../../shared/components/ui";

export default function RequestResetTransactionPinForm({
  mutation,
  onSubmit,
}) {
  const submit = async (event) => {
    event.preventDefault();
    await onSubmit?.();
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
    >
      <Button
        type="submit"
        fullWidth
        loading={mutation?.isPending}
        disabled={mutation?.isPending}
      >
        Send Verification Code
      </Button>
    </form>
  );
}






