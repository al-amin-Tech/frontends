// src/features/notifications/pages/NotificationSettingsPage.jsx
// src/features/notifications/pages/NotificationSettingsPage.jsx

import { useCallback } from "react";

import { Card, Alert } from "../../../shared/components/ui";

import NotificationSettingsCard from "../components/NotificationSettingsCard";
import SupportMessageForm from "../components/SupportMessageForm";
import SupportNotice from "../components/SupportNotice";

import useNotificationSettings from "../hooks/useNotificationSettings";
import useUpdateNotificationSettings from "../hooks/useUpdateNotificationSettings";

export default function NotificationSettingsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useNotificationSettings();
  const updateMutation = useUpdateNotificationSettings();

  const handleToggle = useCallback(
    async (enabled) => {
      try {
        await updateMutation.mutateAsync(enabled);

        await Alert({
          type: "success",
          title: "Notification Updated",
          message: enabled
            ? "Push notifications enabled."
            : "Push notifications disabled.",
        });
      } catch (error) {
        await Alert({
          type: "error",
          title: "Update Failed",
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Unable to update notification settings.",
        });

        updateMutation.reset();
      }
    },
    [updateMutation]
  );

  const handleSupport = useCallback(async () => {
    await Alert({
      type: "info",
      title: "Coming Soon",
      message:
        "Support messaging will become available in a future update.",
    });
  }, []);

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <p className="text-red-600">
          {error?.message ||
            "Failed to load notification settings."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold">
          Notifications & Support
        </h1>

        <p className="mt-2 text-gray-500">
          Manage notification preferences and
          contact our support team whenever you
          need assistance.
        </p>
      </div>

      <NotificationSettingsCard
        enabled={data?.notifications_enabled ?? false}
        loading={isLoading || updateMutation.isPending}
        onChange={handleToggle}
      />

      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Contact Support
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Tell us about any issue,
            suggestion or feedback.
          </p>
        </div>

        <SupportMessageForm
          mutation={{ isPending: false }}
          onSubmit={handleSupport}
        />
      </Card>

      <SupportNotice />
    </div>
  );
}










/*

import { useCallback } from "react";

import {
  Card,
  Alert,
} from "../../../shared/components/ui";

import NotificationSettingsCard
  from "../components/NotificationSettingsCard";

import SupportMessageForm from "../components/SupportMessageForm";


import SupportNotice from "../components/SupportNotice";

import useNotificationSettings from "../hooks/useNotificationSettings";

import useUpdateNotificationSettings from "../hooks/useUpdateNotificationSettings";
  
  

export default function NotificationSettingsPage() {
 // const settingsQuery = useNotificationSettings();
   const {
    data,
    isLoading,
    isError,
    error,
  } = useNotificationSettings();
    
    
    
alert(data);
alert(data?.notifications_enabled);
  const updateMutation =
    useUpdateNotificationSettings();

  const handleToggle =
    useCallback(
      async (enabled) => {
        try {
          await updateMutation.mutateAsync(
            enabled
          );
          await Alert({
            type: "success",
            title:
              "Notification Updated",

            message: enabled
              ? "Push notifications enabled."
              : "Push notifications disabled.",
          });
        } catch (error) {
          await Alert({
            type: "error",
            title: "Update Failed",
            message:
              error?.response?.data
                ?.message ||
              error?.message ||
              "Unable to update notification settings.",
          });

          updateMutation.reset();
        }
      },
      [updateMutation]
    );

  const handleSupport =
    useCallback(async () => {
      await Alert({
        type: "info",
        title: "Coming Soon",

        message:
          "Support messaging will become available in a future update.",
      });
    }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-24">

      <div>

        <h1 className="text-2xl font-bold">
          Notifications & Support
        </h1>

        <p className="mt-2 text-gray-500">
          Manage notification preferences and
          contact our support team whenever you
          need assistance.
        </p>

      </div>

      <NotificationSettingsCard
        enabled={
          data.notifications_enabled ??
          false
        }
        loading={
          isLoading ||
          updateMutation.isPending
        }
        onChange={handleToggle}
      />

      <Card>

        <div className="mb-6">

          <h2 className="text-lg font-semibold">
            Contact Support
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Tell us about any issue,
            suggestion or feedback.
          </p>

        </div>

        <SupportMessageForm
          mutation={{
            isPending: false,
          }}
          onSubmit={handleSupport}
        />

      </Card>

      <SupportNotice />

    </div>
  );
}
*/