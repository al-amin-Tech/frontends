import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import ROUTES from "../../../shared/constants/routes";

import { Alert, Input } from "../../../shared/components/ui";

import {
  SelectionCardGroup,
  SelectField,
  AmountField,
  QuantityField,
  PurchaseButton,
  TransactionPinModal,
  handlePurchaseError,
} from "../../../shared/components/purchase";

import  formatAmount from "../../../shared/components/purchase/components/formatAmount";

import useEdupinPlans from "../hooks/useEdupinPlans";
import usePurchaseEdupin from "../hooks/usePurchaseEdupin";

import { EDUPIN_OPTIONS } from "../helpers/providerOptions";

export default function EducationPage() {
  const navigate = useNavigate();

  /*
   * --------------------------------
   * Form
   * --------------------------------
   */

  const [provider, setProvider] =
    useState("");

  const [planId, setPlanId] =
    useState("");

  const [quantity, setQuantity] =
    useState("1");

  const [email, setEmail] =
    useState("");

  /*
   * --------------------------------
   * Purchase
   * --------------------------------
   */

  const [purchaseError, setPurchaseError] =
    useState("");

  const [pinModalOpen, setPinModalOpen] =
    useState(false);

  /*
   * --------------------------------
   * Plans
   * --------------------------------
   */

  const {
    data: plans = [],
    isLoading,
  } = useEdupinPlans(provider);

  /*
   * --------------------------------
   * Selected Plan
   * --------------------------------
   */

  const selectedPlan = useMemo(() => {
    return plans.find(
      (item) =>
        String(item.planId) ===
        String(planId)
    );
  }, [plans, planId]);

  /*
   * --------------------------------
   * Quantity
   * --------------------------------
   */

  const numericQuantity =
    Number(quantity) || 0;

  /*
   * --------------------------------
   * Total Amount
   *
   * PIN price × quantity
   * --------------------------------
   */

  const totalAmount = useMemo(() => {
    if (
      !selectedPlan?.price ||
      numericQuantity < 1
    ) {
      return "";
    }

    const price =
      Number(selectedPlan.price);

    if (!Number.isFinite(price)) {
      return "";
    }

    return (
      price * numericQuantity
    ).toFixed(2);
  }, [
    selectedPlan,
    numericQuantity,
  ]);

  /*
   * --------------------------------
   * Purchase Mutation
   * --------------------------------
   */

  const purchaseMutation =
    usePurchaseEdupin({

      onSuccess(response) {
        setPinModalOpen(false);

        Alert({
          type: "success",
          title: "Purchase Successful",
          message:
            response?.message ??
            "Education PIN purchased successfully.",
        });
        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            "edu_pin"
          ),
          {
            state: response,
          }
        );
      },

      onError: async (error) => {
        await handlePurchaseError({
          category: "edu_pin",
          error,
          navigate,
          closeModal: () =>
            setPinModalOpen(false),

          setError: setPurchaseError,
          resetPurchaseFlow: () => {
            setPurchaseError("");
            setEmail("");
          },
        });
       await new Promise(resolve => setTimeout(resolve, 3000));
       setPinModalOpen(false); 
        
      },

    });

  /*
   * --------------------------------
   * Provider Change
   * --------------------------------
   */

  function handleProviderChange(value) {
    setProvider(value);

    setPlanId("");

    setQuantity("1");

    setPurchaseError("");
  }

  /*
   * --------------------------------
   * Plan Change
   * --------------------------------
   */

  function handlePlanChange(value) {
    setPlanId(value);

    setQuantity("1");

    setPurchaseError("");
  }

  /*
   * --------------------------------
   * Purchase
   * --------------------------------
   */

  function purchase(pin) {
    purchaseMutation.mutate({
      transaction_pin: pin,

      exam_name: provider,
      //plan: selectedPlan.planId,
      quantity: numericQuantity,
      email: email.trim(),
    });
  }

  /*
   * --------------------------------
   * Form Validity
   * --------------------------------
   */

  const canContinue =
    Boolean(provider) &&
    Boolean(planId) &&
    numericQuantity >= 1 &&
    numericQuantity <= 100 &&
    (Boolean(email.trim()) || Boolean(!email.trim()));

  return (
    <div className="space-y-8">

      {/* Provider cards */}

      <SelectionCardGroup
        title="Select Examination"
        value={provider}
        options={EDUPIN_OPTIONS}
        onChange={handleProviderChange}
      />

      {/* Provider */}

      <SelectField
        label="Provider"
        value={provider}
        placeholder="Select provider"
        options={EDUPIN_OPTIONS}
        getValue={(x) => x.id}
        getLabel={(x) => x.name}
        onChange={handleProviderChange}
      />

      {/* PIN */}

      <SelectField
        label="PIN"
        value={planId}
        disabled={!provider}
        placeholder={
          isLoading
            ? "Loading..."
            : "Select PIN"
        }
        options={plans}
        getValue={(x) => x.planId}
        getLabel={(x) => x.name}
        onChange={handlePlanChange}
      />

      {/* Unit price */}

      <AmountField
        amount={
          selectedPlan?.price
            ? formatAmount(selectedPlan.price)
            : ""
        }
      />

      {/* Quantity */}

      <QuantityField
        value={quantity}
        onChange={(value) => {
          setQuantity(value);
          setPurchaseError("");
        }}
        min={1}
        max={100}
      />

      {/* Total */}

      <AmountField
        label="Total Amount"
        amount={
          totalAmount
            ? formatAmount(totalAmount)
            : ""
        }
      />

      {/* Email */}

      <Input
        label="Email Address"
        leftIcon={<Mail size={20} />}
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setPurchaseError("");
        }}
      />

      {/* Continue */}

      <PurchaseButton
        disabled={!canContinue}
        loading={
          purchaseMutation.isPending
        }
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





