import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";
import { Alert } from "../../../shared/components/ui";

import {
  SelectionCardGroup,
  SelectField,
  AmountField,
  PurchaseButton,
  TransactionPinModal,
  ValidationAlert,
  handlePurchaseError,
} from "../../../shared/components/purchase";

import { CABLE_OPTIONS } from "../../../shared/components/purchase/components/providers";
import  formatAmount from "../../../shared/components/purchase/components/formatAmount";

import SmartCardField from "../components/SmartCardField";
import CustomerInfoCard from "../components/CustomerInfoCard";

import useCablePlans from "../hooks/useCablePlans";
import useValidateIuc from "../hooks/useValidateIuc";
import usePurchaseCable from "../hooks/usePurchaseCable";

export default function CablePage() {
  const navigate = useNavigate();

  /*
   * Form
   */

  const [provider, setProvider] = useState("");

  const [planId, setPlanId] = useState("");

  const [smartCardNumber, setSmartCardNumber] =
    useState("");

  /*
   * Validation
   */

  const [validation, setValidation] =
    useState(null);

  const [validationError, setValidationError] =
    useState("");

  /*
   * Purchase
   */

  const [purchaseError, setPurchaseError] =
    useState("");

  const [pinModalOpen, setPinModalOpen] =
    useState(false);

  /*
   * Plans
   */

  const {
    data: plans = [],
    isLoading,
  } = useCablePlans(provider);

  /*
   * Selected Plan
   */

  const selectedPlan = useMemo(() => {
    return plans.find(
      (item) =>
        String(item.planId) ===
        String(planId)
    );
  }, [plans, planId]);

  /*
   * Validation
   */

  const validateMutation =
    useValidateIuc();

  /*
   * Purchase
   */

  const purchaseMutation =
    usePurchaseCable({
      onSuccess(response) {
        setPinModalOpen(false);

        Alert({
          type: "success",
          title: "Purchase Successful",
          message:
            response?.message ??
            "Cable subscription successful.",
        });

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            "cable"
          ),
          {
            state: response,
          }
        );
      },

      onError: async (error) => {
        await handlePurchaseError({
          category: "cable",
          error,
          navigate,
          closeModal: () =>
            setPinModalOpen(false),
          setError: setPurchaseError,

          resetPurchaseFlow: () => {
            setValidation(null);
            setValidationError("");
            setPurchaseError("");
          },
        });
        
        await new Promise(resolve =>
          setTimeout(resolve, 3000)
        );

        setPinModalOpen(false);
      },
    });

  /*
   * Validate
   */

  async function validateCustomer() {
    setValidationError("");

    try {
      const response =
        await validateMutation.mutateAsync({
          cablename: provider,
          cableplan: selectedPlan.planId,
          smart_card_number: smartCardNumber,
        });

      setValidation(response);

    } catch (error) {

      setValidation(null);

      setValidationError(
        error.message ??
          error.response?.data?.message ??
          "Unable to validate customer."
      );
    }
  }

  /*
   * Purchase
   */

  function purchase(pin) {
    purchaseMutation.mutate({
      
      transaction_pin: pin,
      cablename: provider,
      cableplan: selectedPlan.planId,
      smart_card_number: smartCardNumber,
    });
  }

  return (
    <div className="space-y-8">

      <SelectionCardGroup
        title="Select Provider"
        value={provider}
        options={CABLE_OPTIONS}
        onChange={(value) => {

          setProvider(value);
          setPlanId("");
          setValidation(null);
          setValidationError("");
          setPurchaseError("");

        }}
      />

      <SelectField
        label="Provider"
        value={provider}
        placeholder="Select provider"
        options={CABLE_OPTIONS}
        getValue={(x) => x.id}
        getLabel={(x) => x.name}
        onChange={setProvider}
      />

      <SelectField
        label="Package"
        value={planId}
        disabled={!provider}
        placeholder={
          isLoading
            ? "Loading..."
            : "Select package"
        }

        options={plans}
        getValue={(x) => x.planId}
        getLabel={(x) => x.name}
        onChange={(value) => {

          setPlanId(value);
          setValidation(null);
          setValidationError("");
          setPurchaseError("");

        }}
      />

      <AmountField
        amount={
          selectedPlan?.price
            ? formatAmount(selectedPlan.price)
            : ""
        }
      />

      <SmartCardField
        value={smartCardNumber}
        validation={validation}
        onChange={(value) => {
        
          setSmartCardNumber(value);
          setValidation(null);
          setValidationError("");

        }}
      />

      <ValidationAlert
        success={false}
        message={validationError}
      />

      {validation && (
        <CustomerInfoCard
          customer={validation}
        />
      )}

      {!validation && (
        <PurchaseButton
          loading={
            validateMutation.isPending
          }
          disabled={
            !provider ||
            !planId ||
            smartCardNumber.length < 6
          }
          onClick={validateCustomer}
        >
          Validate Smart Card
        </PurchaseButton>
      )}

      {validation && (
        <PurchaseButton
          loading={
            purchaseMutation.isPending
          }
          onClick={() =>
            setPinModalOpen(true)
          }
        >
          Continue
        </PurchaseButton>
      )}

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