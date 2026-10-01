import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";
import { Alert } from "../../../shared/components/ui";

import {
  SelectionCardGroup,
  AmountField,
  SelectField,
  PurchaseButton,
  TransactionPinModal,
  ValidationAlert,
  DiscountField,
  AmountToPayField,
  QuantityField,
  handlePurchaseError,
} from "../../../shared/components/purchase";

import  formatAmount from "../../../shared/components/purchase/components/formatAmount";

import { NETWORK_OPTIONS, NETWORKS, } from "../../../shared/components/purchase/components/networks";

import useEpinPlans from "../hooks/useEpinPlans";
import usePurchaseEpin from "../hooks/usePurchaseEpin";

import EpinAmountField from "../components/EpinAmountField";
import NameOnCardField from "../components/NameOnCardField";

import calculateEpinTotal from "../helpers/calculateEpinTotal";

export default function EpinPage() {
  const navigate = useNavigate();

  /*
   * --------------------------------------
   * Form
   * --------------------------------------
   */

  const [network, setNetwork] = useState("");

  const [amount, setAmount] = useState("");

  const [quantity, setQuantity] =
    useState("1");

  const [nameOnCard, setNameOnCard] =
    useState("");

  /*
   * --------------------------------------
   * Purchase
   * --------------------------------------
   */

  const [purchaseError, setPurchaseError] =
    useState("");

  const [pinModalOpen, setPinModalOpen] =
    useState(false);

  /*
   * --------------------------------------
   * Plans
   * --------------------------------------
   */

  const {
    data: plans = [],
    isLoading: loadingPlans,
  } = useEpinPlans(network);

  /*
   * --------------------------------------
   * Selected Plan
   * --------------------------------------
   */

  const selectedPlan = useMemo(() => {
    if (!plans.length) return null;

    /*
     * EPIN backend returns the available
     * denomination information through
     * the catalog.
     *
     * We select the matching denomination
     * when the backend provides it.
     */

    return plans.find((item) => {
      const predefined =
        Array.isArray(
          item.pre_defined_amounts
        )
          ? item.pre_defined_amounts
          : [];

      if (!predefined.length) {
        return true;
      }

      return predefined.some(
        (value) =>
          Number(value) === Number(amount)
      );
    }) ?? plans[0];
  }, [plans, amount]);

  /*
   * --------------------------------------
   * Discount
   * --------------------------------------
   */

  const discount =
    selectedPlan?.discount ?? 0;

  /*
   * --------------------------------------
   * Total Calculation
   * --------------------------------------
   */

  const calculation = useMemo(() => {
    return calculateEpinTotal({
      amount,
      discount,
      quantity,
    });
  }, [
    amount,
    discount,
    quantity,
  ]);

  /*
   * --------------------------------------
   * Purchase Mutation
   * --------------------------------------
   */

  const purchaseMutation =
    usePurchaseEpin({
      onSuccess(response) {
        setPinModalOpen(false);

        Alert({
          type: "success",
          title: "Purchase Successful",
          message:
            response?.message ??
            "Recharge PIN purchase completed successfully.",
        });

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            "e_pin"
          ),
          {
            state: response,
          }
        );
      },

      onError: async (error) => {
        await handlePurchaseError({
          category: "e_pin",
          error,
          navigate,

          closeModal: () =>
            setPinModalOpen(false),

          setError:
            setPurchaseError,

          resetPurchaseFlow: () => {
            setPurchaseError("");
          },
        });

        await new Promise(
          (resolve) =>
            setTimeout(resolve, 2500)
        );

        setPinModalOpen(false);
      },
    });

  /*
   * --------------------------------------
   * Reset
   * --------------------------------------
   */

  function resetForm() {
    setAmount("");
    setQuantity("1");
    setNameOnCard("");
    setPurchaseError("");
  }

  /*
   * --------------------------------------
   * Network
   * --------------------------------------
   */

  function handleNetworkChange(value) {
    setNetwork(value);
    resetForm();
  }

  /*
   * --------------------------------------
   * Purchase
   * --------------------------------------
   */

  function purchase(pin) {
    purchaseMutation.mutate({
      transaction_pin: pin,

      network,

      amount,

      quantity: Number(quantity),

      name_on_card:
        nameOnCard.trim(),
    });
  }

  /*
   * --------------------------------------
   * Validation
   * --------------------------------------
   */

  const canContinue =
    Boolean(network) &&
    Boolean(amount) &&
    Number(quantity) > 0 &&
    Boolean(nameOnCard.trim()) &&
    Boolean(selectedPlan);

  return (
    <div className="space-y-8">



      {/* Network */}

      <SelectionCardGroup
        title="Recharge Card PIN"
        value={network}
        options={NETWORKS}
        onChange={handleNetworkChange}
      />
      
      <SelectField
        label="Network"
        value={network}
        placeholder={
          loadingPlans
            ? "Loading..."
            : "Select network"
        }
        options={NETWORK_OPTIONS}
        getValue={(x) => x.id}
        getLabel={(x) => x.name}
        onChange={handleNetworkChange}
      />

      {/* Amount */}

      <EpinAmountField
        value={amount}
        onChange={(value) => {
          setAmount(value);
          setPurchaseError("");
        }}
      />

      {/* Discount */}

      <DiscountField
        value={discount}
      />

      {/* Quantity */}

      <QuantityField
        label="Quantity"
        value={quantity}
        min={1}
        onChange={(value) => {
          setQuantity(value);
          setPurchaseError("");
        }}
      />

      {/* Name */}

      <NameOnCardField
        value={nameOnCard}
        onChange={(value) => {
          setNameOnCard(value);
          setPurchaseError("");
        }}
      />

      {/* Unit price */}

      <AmountField
        label="Amount Per PIN"
        amount={formatAmount(calculation.discountedUnitPrice)}
             />

      {/* Total */}

      <AmountToPayField
        label="Total Amount To Pay"
        value={formatAmount(calculation.total)}
      />

      <ValidationAlert
        success={false}
        message={purchaseError}
      />

      {/* Continue */}

      <PurchaseButton
        loading={
          purchaseMutation.isPending
        }
        disabled={!canContinue}
        onClick={() =>
          setPinModalOpen(true)
        }
      >
        Continue
      </PurchaseButton>

      {/* Transaction PIN */}

      <TransactionPinModal
        open={pinModalOpen}
        loading={
          purchaseMutation.isPending
        }
        error={purchaseError}
        onErrorChange={
          setPurchaseError
        }
        onClose={() =>
          setPinModalOpen(false)
        }
        onSubmit={purchase}
      />

    </div>
  );
}