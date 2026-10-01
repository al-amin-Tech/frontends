import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";
import { Alert } from "../../../shared/components/ui";

import {
  SelectionCardGroup,
  SelectField,
  PhoneNumberField,
  PurchaseButton,
  TransactionPinModal,
  ValidationAlert,
  DiscountField,
  AmountInputField,
  AmountToPayField,
  handlePurchaseError,
  
} from "../../../shared/components/purchase";

import { NETWORK_OPTIONS, NETWORKS, } from "../../../shared/components/purchase/components/networks";
import  formatAmount from "../../../shared/components/purchase/components/formatAmount";

import useAirtimePlanTypes from "../hooks/useAirtimePlanTypes";
import useAirtimePlans from "../hooks/useAirtimePlans";
import useValidateAirtimeNumber from "../hooks/useValidateAirtimeNumber";
import usePurchaseAirtime from "../hooks/usePurchaseAirtime";

import calculateDiscount from "../helpers/calculateDiscount";


export default function AirtimePage() {
  const navigate = useNavigate();

  /*
   * Form
   */

  const [network, setNetwork] = useState("");

  const [planType, setPlanType] = useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [amount, setAmount] = useState("");

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
   * Queries
   */

  const {
    data: planTypes = [],
    isLoading: loadingTypes,
  } = useAirtimePlanTypes(network);

  const {
    data: plans = [],
    isLoading: loadingPlans,
  } = useAirtimePlans({
    network,
    planType,
  });

  /*
   * Remove duplicates
   */

  const uniquePlanTypes = useMemo(() => {
    return Array.from(
      new Map(
        planTypes.map((x) => [
          x.plan_type,
          x,
        ])
      ).values()
    );
  }, [planTypes]);

  /*
   * Selected Plan
   */

  const selectedPlan = useMemo(() => {
    return plans[0];
  }, [plans]);

  /*
   * Discount
   */

  const calculation = useMemo(() => {
    return calculateDiscount(
      amount,
      selectedPlan?.discount
    );
  }, [amount, selectedPlan]);

  /*
   * Validation
   */

  const validateMutation =
    useValidateAirtimeNumber();

  /*
   * Purchase
   */

  const purchaseMutation =
    usePurchaseAirtime({
      onSuccess(response) {
        setPinModalOpen(false);

        Alert({
          type: "success",
          title: "Purchase Successful",
          message:
            response?.message ??
            "Airtime purchase completed.",
        });

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            "airtime"
          ),
          {
            state: response,
          }
        );
      },

    onError: async (error) => {
    await handlePurchaseError({
      category: "airtime",
      error,
      navigate,
      closeModal: () => setPinModalOpen(false),
      setError: setPurchaseError,
      resetPurchaseFlow: () => {
      setValidation(null);
      setValidationError("");
      setPurchaseError("");
      setPhoneNumber("");
      setAmount("");
      
    },
  });

await new Promise(resolve => setTimeout(resolve, 2500));
  setPinModalOpen(false);
},

    });

  /*
   * Validate Number
   */

  async function validateNumber() {
    setValidationError("");

    try {
      const response =
        await validateMutation.mutateAsync({
          network,
          phoneNumber,
          amount,
          planType,
        });

      setValidation(response);

    } catch (error) {

      setValidation(null);

      setValidationError(
        error?.message ??
          error?.response?.data?.message ??
          "Unable to validate number."
      );
    }
  }

  /*
   * Purchase
   */

  function purchase(pin) {
    purchaseMutation.mutate({
      transaction_pin: pin,

      network,

      plan_type: planType,

      amount,

      mobile_number: phoneNumber,

      ported_number: false,
    });
  }

  return (
    <div className="space-y-8">

      <SelectionCardGroup
        title="Buy Airtime"
        value={network}
        options={NETWORKS}
        onChange={(value) => {
          setNetwork(value);
          setPlanType("");
          setAmount("");
          setValidation(null);
          setValidationError("");
          setPurchaseError("");
        }}
      />

      <SelectField
        label="Network"
        value={network}
        placeholder="Select network"
        options={NETWORK_OPTIONS}
        
        getValue={(x) => x.id}
        getLabel={(x) => x.name}
        onChange={setNetwork}
      />

      <SelectField
        label="Airtime Type"
        value={planType}
        disabled={!network}
        placeholder={
          loadingTypes
            ? "Loading..."
            : "Select airtime type"
        }
        options={uniquePlanTypes}
        getValue={(x) => x.plan_type}
        getLabel={(x) => x.plan_type}
        onChange={(value) => {
          setPlanType(value);

          setAmount("");

          setValidation(null);

          setValidationError("");

          setPurchaseError("");
        }}
      />

      <DiscountField
        value={selectedPlan?.discount}
      />

      <AmountInputField
        value={amount}
        onChange={(value) => {
          setAmount(value);

          setValidation(null);
          setValidationError("");
          setPurchaseError("");
        }}
      />

      <AmountToPayField
        value={formatAmount(calculation.payable)}
      />

      <PhoneNumberField
        value={phoneNumber}
        onChange={(value) => {
          setPhoneNumber(value);
          setValidation(null);
          setValidationError("");
        }}
        validation={validation}
      />

      <ValidationAlert
        success={false}
        message={validationError}
      />

      {!validation && (
        <PurchaseButton
          loading={
            validateMutation.isPending
          }
          disabled={
            !network ||
            !planType ||
            !amount ||
            phoneNumber.length !== 11
          }
          onClick={validateNumber}
        >
          Validate Number
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