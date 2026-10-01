// src/features/electricity/pages/ElectricityPage.jsx

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../../shared/constants/routes";

import { Alert } from "../../../shared/components/ui";

import {
  SelectField,
  ValidationAlert,
  PurchaseButton,
  TransactionPinModal,
  DiscountField,
  AmountInputField,
  AmountToPayField,
  MeterNumberField,
  MeterValidationCard,
  handlePurchaseError,
} from "../../../shared/components/purchase";

import useElectricityPlans from "../hooks/useElectricityPlans";
import useValidateMeter from "../hooks/useValidateMeter";
import usePurchaseElectricity from "../hooks/usePurchaseElectricity";

import calculateDiscount from "../helpers/calculateDiscount";
import parseMeterTypes from "../helpers/parseMeterTypes";

export default function ElectricityPage() {
  const navigate = useNavigate();

  /*
  ----------------------------------
  Form
  ----------------------------------
  */

  const [provider, setProvider] = useState("");

  const [meterType, setMeterType] =
    useState("");

  const [meterNumber, setMeterNumber] =
    useState("");

  const [amount, setAmount] =
    useState("");

  /*
  ----------------------------------
  Validation
  ----------------------------------
  */

  const [validation, setValidation] =
    useState(null);

  const [validationError, setValidationError] =
    useState("");

  /*
  ----------------------------------
  Purchase
  ----------------------------------
  */

  const [purchaseError, setPurchaseError] =
    useState("");

  const [pinModalOpen, setPinModalOpen] =
    useState(false);

  /*
  ----------------------------------
  Plans
  ----------------------------------
  */

  const {
    data: plans = [],
    isLoading,
  } = useElectricityPlans();

  /*
  ----------------------------------
  Providers
  ----------------------------------
  */

  const uniqueProviders = useMemo(() => {
    return Array.from(
      new Map(
        plans.map((item) => [
          item.provider,
          item,
        ])
      ).values()
    );
  }, [plans]);

  /*
  ----------------------------------
  Selected Provider
  ----------------------------------
  */

  const selectedProvider = useMemo(() => {
    return plans.find(
      (item) =>
        item.provider === provider
    );
  }, [plans, provider]);

  /*
  ----------------------------------
  Meter Types
  ----------------------------------
  */

  const meterTypes = useMemo(() => {
    if (!selectedProvider) {
      return [];
    }

    return parseMeterTypes(
      selectedProvider.type
    );
  }, [selectedProvider]);

  /*
  ----------------------------------
  Discount
  ----------------------------------
  */

  const calculation = useMemo(() => {
    return calculateDiscount(
      amount,
      selectedProvider?.discount
    );
  }, [
    amount,
    selectedProvider,
  ]);

  /*
  ----------------------------------
  Validation Mutation
  ----------------------------------
  */

  const validateMutation =
    useValidateMeter();

  /*
  ----------------------------------
  Purchase Mutation
  ----------------------------------
  */

  const purchaseMutation =
    usePurchaseElectricity({

      onSuccess(response) {

        setPinModalOpen(false);

        Alert({
          type: "success",
          title:
            "Purchase Successful",
          message:
            response?.message ??
            "Electricity purchase completed.",
        });

        navigate(
          ROUTES.PURCHASE_HISTORY.replace(
            ":category",
            "electricity"
          ),
          {
            state: response,
          }
        );
      },

      onError: async (error) => {

        await handlePurchaseError({
          category:
            "electricity",

          error,
          navigate,
          closeModal: () =>
            setPinModalOpen(false),
          setError:
            setPurchaseError,
            
          resetPurchaseFlow: () => {
            setValidation(null);
            setValidationError("");
            setPurchaseError("");
            setMeterNumber("");
          },
        });

        await new Promise(resolve => setTimeout(resolve, 2500));
        setPinModalOpen(false);

      },

    });

  /*
  ----------------------------------
  Validate Meter
  ----------------------------------
  */

  async function validateMeter() {

    setValidationError("");

    try {

      const response =
        await validateMutation.mutateAsync({

          meterNumber,
         discoName: provider,
          type: meterType,

          amount,

        });

      setValidation(response);

    } catch (error) {
      setValidation(null);
      setValidationError(
        error?.message ??
        error?.response?.data?.message ??
        "Unable to validate meter."

      );

    }

  }

  /*
  ----------------------------------
  Purchase
  ----------------------------------
  */

  function purchase(pin) {

    purchaseMutation.mutate({

      transaction_pin: pin,

     disco_name: provider,

      plan_type: meterType,

      meter_number: meterNumber,

      amount,

    });

  }

  return (

    <div className="space-y-8">

      <SelectField
        label="Distribution Company"
        value={provider}
        placeholder="Select company"
        disabled={isLoading}
        options={uniqueProviders}
        getValue={(x) => x.provider}
        getLabel={(x) => x.name}
        onChange={(value) => {

          setProvider(value);

          setMeterType("");

          setValidation(null);

          setValidationError("");

          setPurchaseError("");

          setAmount("");

        }}
      />

      <SelectField
        label="Meter Type"
        value={meterType}
        disabled={!provider}
        placeholder="Select meter type"
        options={meterTypes}
        getValue={(x) => x.id}
        getLabel={(x) => x.name}
        onChange={(value) => {

          setMeterType(value);

          setValidation(null);

          setValidationError("");

          setPurchaseError("");

        }}
      />

      <DiscountField
        value={
          selectedProvider?.discount
        }
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
        value={
          calculation.payable
        }
      />

      <MeterNumberField
        value={meterNumber}
        validation={validation}
        onChange={(value) => {
          setMeterNumber(value);
          setValidation(null);
          setValidationError("");
          setPurchaseError("");

        }}
      />

      {validation && (
        <MeterValidationCard
          customer={validation}
        />
      )}

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
            !provider ||
            !meterType ||
            !amount ||
            meterNumber.length < 6
          }
          onClick={validateMeter}
        >
          Validate Meter
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