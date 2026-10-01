// src/features/users/pages/PersonalInformationPage.jsx
import { useCallback, useEffect } from "react";
import PersonalInformationForm from "../components/PersonalInformationForm";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { Alert, Card, Spinner } from "../../../shared/components/ui";

export default function PersonalInformationPage() {
  const {
    data,
    isLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfile();

  const updateProfileMutation = useUpdateProfile();

  // Architectural Note: We only use useEffect here for the INITIAL LOAD error.
  // Mutation success/error states are handled directly in the handleSubmit callbacks 
  // to prevent React Query side-effect anti-patterns (stale closures, double-fires).
  useEffect(() => {
    if (isProfileError && profileError) {
      // Log detailed error to monitoring service (e.g., Sentry, Datadog)
      console.error("Profile load failed:", profileError);
      
      // Show sanitized, generic message to the user to prevent Information Disclosure
      Alert({
        type: "error",
        title: "Load Failed",
        message: "Unable to load your profile. Please try refreshing the page.",
      });
    }
  }, [isProfileError, profileError]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        // 1. Explicitly construct the payload (Prevents Mass Assignment / Over-Posting)
        const payload = {
          full_name: values.full_name,
          phone: values.phone,
          notifications_enabled: values.notifications_enabled,
        };

        // 2. Conditionally attach FCM token ONLY if notifications are enabled and a token exists
        if (values.notifications_enabled && values.fcm_token) {
          payload.fcm_token = values.fcm_token;
        }

        // 3. Execute mutation with canonical React Query callbacks
        await updateProfileMutation.mutateAsync(payload, {
          onSuccess: () => {
            Alert({
              type: "success",
              title: "Profile Updated",
              message: "Your profile and notification preferences have been saved successfully.",
            });
          },
          onError: (error) => {
            // Log detailed error for backend/DevOps observability
            console.error("Profile update mutation failed:", error);
            
            // Show sanitized, generic message to the user
            Alert({
              type: "error",
              title: "Update Failed",
              message: "Unable to update your profile. Please check your connection and try again.",
            });
          },
        });
      } catch (error) {
        // Fallback catch block for unexpected synchronous errors or mutation setup failures
        console.error("Unexpected error during profile update submission:", error);
        Alert({
          type: "error",
          title: "Update Failed now",
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    },
    [updateProfileMutation]
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" aria-label="Loading profile information" />
      </div>
    );
  }

  // Error State Fallback UI
  // Returning null is an anti-pattern if we want the user to know what happened.
  // A graceful fallback UI is the senior architectural choice.
  if (isProfileError) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 pb-24 pt-8">
        <Alert
          type="error"
          title="Load Failed"
          message="We were unable to load your profile information. Please try refreshing the page."
        />
      </div>
    );
  }

  // Success / Render State
  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24 pt-8 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your account information and notification preferences.
        </p>
      </div>

      <Card>
        <PersonalInformationForm
          profile={data?.user}
          mutation={updateProfileMutation}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}











/*
// src/features/users/pages/PersonalInformationPage.jsx

import { useCallback, useEffect } from "react";
import PersonalInformationForm from "../components/PersonalInformationForm";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import {
  Alert,
  Card,
  Spinner,
} from "../../../shared/components/ui";

export default function PersonalInformationPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useProfile();

  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (!isError) return;

    Alert({
      type: "error",
      title: "Load Failed",
      message:
        error?.response?.data?.message ??
        error?.message ??
        "Unable to load your profile.",
    });
  }, [isError, error]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        await updateProfileMutation.mutateAsync({
          full_name: values.full_name,
          phone: values.phone,
          notifications_enabled:
            values.notifications_enabled,
        });
      } catch (error) {
        await Alert({
          type: "error",
          title: "Update Failed",
          message:
            error?.response?.data?.message ??
            error?.message ??
            "Unable to update your profile.",
        });

        updateProfileMutation.reset();
      }
    },
    [updateProfileMutation]
  );
  
  useEffect(() => {
    if (!updateProfileMutation.isSuccess) {
      return;
    }

    Alert({
      type: "success",
      title: "Profile Updated",
      message: "Your Profile updated successfully.",
    });

    updateProfileMutation.reset();
  }, [
    updateProfileMutation.isSuccess,
    updateProfileMutation,
  ]);


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Personal Information
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your account information and
          notification preferences.
        </p>
      </div>

      <Card>
        <PersonalInformationForm
          profile={data?.user}
          mutation={updateProfileMutation}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}


*/