import {
    PURCHASE_CODES,
} from "./purchaseMessages";

import {
    navigateToReceipt,
    navigateToSetPin,
} from "./purchaseNavigation";

export function handlePurchaseError({
    error,
    navigate,
    setError,
    closeModal,
}) {

    closeModal?.();

    const data =
        error?.response?.data ?? {};

    const code =
        data.code;

    const message =
        data.message ??
        "Purchase failed.";

    switch (code) {

        case PURCHASE_CODES.PIN_NOT_SET:

            navigateToSetPin(navigate);

            return;

        case PURCHASE_CODES.PROCESSING:

            navigateToReceipt(
                navigate,
                {
                    status: "processing",
                    message,
                },
            );

            return;

        default:

            setError(message);

    }
}