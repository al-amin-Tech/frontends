import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";
import {
  Alert
} from "../../../shared/components/ui";

import {
  SelectionCardGroup,
  SelectField,
  PhoneNumberField,
  AmountField,
  ValidationAlert,
  PurchaseButton,
  TransactionPinModal,
  handlePurchaseError,
} from "../../../shared/components/purchase";

import { NETWORK_OPTIONS, NETWORKS, } from "../../../shared/components/purchase/components/networks";
import  formatAmount from "../../../shared/components/purchase/components/formatAmount";


import usePlanTypes from "../hooks/usePlanTypes";
import usePlans from "../hooks/usePlans";
import useValidateDataNumber from "../hooks/useValidateDataNumber";
import usePurchaseData from "../hooks/usePurchaseData";

export default function DataPage() {
  const navigate = useNavigate();

  /*
   * Form State
   */

  const [network, setNetwork] = useState("");

  const [planType, setPlanType] = useState("");

  const [planId, setPlanId] = useState("");

  const [phoneNumber, setPhoneNumber] =
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
   * Queries
   */

  const {
    data: planTypes = [],
    isLoading: loadingPlanTypes,
  } = usePlanTypes(network);

  const {
    data: plans = [],
    isLoading: loadingPlans,
  } = usePlans({
    network,
    planType,
  });
  
  

const uniquePlanTypes = useMemo(() => {
  return Array.from(
    new Map(
      planTypes.map((item) => [item.plan_type, item])
    ).values()
  );
}, [planTypes]);


  /*
   * Selected plan
   */

  const selectedPlan = useMemo(() => {
    return plans.find(
      (item) =>
        String(item.planId) ===
        String(planId)
    );
  }, [plans, planId]);

  /*
   * Validation Mutation
   */

  const validateMutation =
    useValidateDataNumber();

  /*
   * Purchase Mutation
   */

  const purchaseMutation =
    usePurchaseData({
      onSuccess(response) {
        setPinModalOpen(false);
        
         Alert({
          type: "success",
          title: "purchase",
          message: response?.message || "Data purchase successfullly"
        });
       navigate(ROUTES.PURCHASE_HISTORY.replace(
          ":category",
          'data'
        ), {
          state: response,
        }); 
      },

      onError: async (error) => {
    await handlePurchaseError({
      category: "data",
      error,
      navigate,
      closeModal: () => setPinModalOpen(false),
      setError: setPurchaseError,
      resetPurchaseFlow: () => {
      setValidation(null);
      setValidationError("");
      setPurchaseError("");
      setPhoneNumber("");
      
    },
  });

await new Promise(resolve => setTimeout(resolve, 3000));
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
      plan: selectedPlan.planId,
      mobile_number: phoneNumber,
      ported_number: false,
    });
  }

  return (
    <div className="space-y-8">

    

      <SelectionCardGroup
       title="Buy Data"
        value={network}
        options={NETWORKS}
        onChange={(value) => {
          setNetwork(value);

          setPlanType("");
          setPlanId("");
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
              label="Plan Type"
              value={planType}
              disabled={!network}
              placeholder={
              loadingPlanTypes
              ? "Loading..."
             : "Select plan type"
  }
           options={uniquePlanTypes}
           getValue={(x) => x.plan_type}
           getLabel={(x) => x.plan_type}
           onChange={(value) => {
           setPlanType(value);

           setPlanId("");
           setValidation(null);
           setValidationError("");
           setPurchaseError("");
  }}
/>

          <SelectField
          label="Data Plan"
          value={planId}
          disabled={!planType}
          placeholder={
          loadingPlans ? "Loading..." : "Select plan"
  }
          options={plans}
          getValue={(x) => x.planId}
          getLabel={(x) => `${x.name} • ₦${x.price}`}
          onChange={(value) => {
           setPlanId(value);

         // Require validation again
           setValidation(null);
           setValidationError("");
           setPurchaseError("");
  }}
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
          
      <AmountField
        amount={
          selectedPlan?.price
            ? formatAmount(selectedPlan.price)
            : ""
        }
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
          !planId ||
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


