import { useState } from "react";
import { KeyRound } from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth.js";
import { useProfile } from "../../users/hooks/useProfile";

import { useApiCredentials } from "../hooks/useApiCredentials.js";
import { useGenerateApiCredentials } from "../hooks/useGenerateApiCredentials.js";
import { useDisableApiUser } from "../hooks/useDisableApiUser.js";
import { useEnableApiUser } from "../hooks/useEnableApiUser.js";

import ApiAccessCard from "../components/ApiAccessCard.jsx";
import ApiCredentialsDisplay from "../components/ApiCredentialsDisplay.jsx";
import GenerateCredentialsModal from "../components/GenerateCredentialsModal.jsx";
import GeneratedCredentialsModal from "../components/GeneratedCredentialsModal.jsx";

import { Alert } from "../../../shared/components/ui";

export default function ApiKeysPage() {
  const { user } = useAuth();
//  const { data } = useProfile();
  
  const uuid = user?.uuid;
  
  const [showGenerateModal, setShowGenerateModal] =
    useState(false);

  const [generatedCredentials, setGeneratedCredentials] =
    useState(null);

  const {
    data: credentials,
    isLoading,
    isError,
  } = useApiCredentials(uuid);
  

  
  const generateMutation =
    useGenerateApiCredentials(uuid);

  const disableMutation =
    useDisableApiUser(uuid);

  const enableMutation =
    useEnableApiUser(uuid);

  const handleGenerate = async (authMode) => {
    try {
      const response =
        await generateMutation.mutateAsync(authMode);

      setShowGenerateModal(false);

      setGeneratedCredentials(response);

      Alert({
        type: "success",
        title: "Credentials Generated",
        message:
          response?.message ??
          "Your API credentials were generated successfully.",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to generate API credentials.";

      Alert({
        type: "error",
        title: "Credential Generation Failed",
        message,
      });
    }
  };

  const handleDisable = async () => {
    try {
      const response =
        await disableMutation.mutateAsync();

      Alert({
        type: "success",
        title: "API Access Disabled",
        message:
          response?.message ??
          "Your API access has been disabled successfully.",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to disable API access.";

      Alert({
        type: "error",
        title: "Disable Failed",
        message,
      });
    }
  };

  const handleEnable = async () => {
    try {
      const response =
        await enableMutation.mutateAsync();

      Alert({
        type: "success",
        title: "API Access Enabled",
        message:
          response?.message ??
          "Your API access has been enabled successfully.",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Unable to enable API access.";

      Alert({
        type: "error",
        title: "Enable Failed",
        message,
      });
    }
  };

  const mutationLoading =
    generateMutation.isPending ||
    disableMutation.isPending ||
    enableMutation.isPending;

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                API Keys
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your API credentials and authentication.
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">
              Loading API credentials...
            </p>
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Unable to load your API credentials.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-5">

            {credentials && (
              <>
                <ApiAccessCard
                  status={credentials.status}
                  loading={mutationLoading}
                  onEnable={handleEnable}
                  onDisable={handleDisable}
                />

                <ApiCredentialsDisplay
                  credentials={credentials}
                />
              </>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {credentials
                    ? "Authentication Method"
                    : "Set Up API Authentication"}
                </h2>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Review the available authentication methods
                  before choosing one for your integration.
                </p>
              </div>

            <button
             type="button"
             onClick={() => setShowGenerateModal(true)}
             disabled={mutationLoading}
             aria-busy={mutationLoading}
             className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:scale-100"
             >
             {credentials
             ? "Change / Rotate Credentials"
             : "Generate API Credentials"}
             </button>
            </div>
          </div>
        )}
      </div>

      <GenerateCredentialsModal
        open={showGenerateModal}
        loading={generateMutation.isPending}
        currentMode={credentials?.authMode}
        onClose={() =>
          setShowGenerateModal(false)
        }
        onSubmit={handleGenerate}
      />

      <GeneratedCredentialsModal
        open={Boolean(generatedCredentials)}
        credentials={generatedCredentials}
        onClose={() =>
          setGeneratedCredentials(null)
        }
      />
    </div>
  );
}