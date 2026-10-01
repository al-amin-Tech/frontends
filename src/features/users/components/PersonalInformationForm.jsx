// src/features/users/components/PersonalInformationForm.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  Bell,
} from "lucide-react";

// Firebase messaging + notification permission handler
import { messaging } from "../../../config/firebase/config";
import { requestNotificationPermission } from "../../../config/utils/permissionHandler";

import {
  Button,
  Input,
  Alert,
} from "../../../shared/components/ui";

import { userProfileSchema } from "../schemas/user.schema";

// Firebase Console:
// Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY =
  "BK7w5f-Ojg2ARwgdqjHTULPzXtzOoBCP8xgaERTxYheCTQevXN-k0EKcNBp1AJ_lenaMjME1v1Rg55IWamYNdf0";

export default function PersonalInformationForm({
  profile,
  mutation,
  onSubmit,
}) {
  const [notificationLoading, setNotificationLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onTouched",

    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      role: "",
      kyc_status: "",
      notifications_enabled: false,
      fcm_token: null,
    },
  });

  // --------------------------------------------------
  // Load profile data
  // --------------------------------------------------

  useEffect(() => {
    if (!profile) return;

    reset({
      full_name: profile.full_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      role: profile.role ?? "",
      kyc_status: profile.kyc_status ?? "",

      notifications_enabled:
        profile.notifications_enabled ?? false,

      fcm_token:
        profile.fcm_token ?? null,
    });
  }, [profile, reset]);

  const notificationsEnabled = watch(
    "notifications_enabled"
  );

  // --------------------------------------------------
  // Notification toggle
  // --------------------------------------------------

  const handleNotificationToggle = async () => {
    // Prevent multiple requests while Firebase is working
    if (notificationLoading) {
      return;
    }

    const targetValue = !notificationsEnabled;

    // ==================================================
    // ENABLE NOTIFICATIONS
    // ==================================================

    if (targetValue) {
      try {
        setNotificationLoading(true);

        console.log(
          "[Notifications] Starting notification setup..."
        );

        const result =
          await requestNotificationPermission(
            messaging,
            VAPID_KEY
          );

        console.log(
          "[Notifications] Result:",
          result
        );

        // ----------------------------------------------
        // SUCCESS
        // ----------------------------------------------

        if (
          result?.status === "granted" &&
          result?.fcmToken
        ) {
          setValue(
            "notifications_enabled",
            true,
            {
              shouldDirty: true,
              shouldValidate: true,
            }
          );

          setValue(
            "fcm_token",
            result.fcmToken,
            {
              shouldDirty: true,
              shouldValidate: true,
            }
          );

          console.log(
            "[Notifications] Notifications enabled successfully."
          );

          return;
        }

        // ----------------------------------------------
        // FAILED
        // ----------------------------------------------

        console.warn(
          "[Notifications] Could not enable notifications:",
          result
        );

        // Make sure the form does not contain stale data
        setValue(
          "notifications_enabled",
          false,
          {
            shouldDirty: false,
            shouldValidate: true,
          }
        );

        setValue(
          "fcm_token",
          null,
          {
            shouldDirty: false,
            shouldValidate: true,
          }
        );

        // ----------------------------------------------
        // Show the actual reason returned by handler
        // ----------------------------------------------

        Alert({
          type: "warning",
          title: "Notifications Disabled",
          message:
            result?.message ||
            "Notifications could not be enabled.",
        });
      } catch (error) {
        console.error(
          "[Notifications] Unexpected error:",
          error
        );

        // Clear notification state
        setValue(
          "notifications_enabled",
          false,
          {
            shouldDirty: false,
            shouldValidate: true,
          }
        );

        setValue(
          "fcm_token",
          null,
          {
            shouldDirty: false,
            shouldValidate: true,
          }
        );

        Alert({
          type: "warning",
          title: "Notifications Disabled",
          message:
            error?.message ||
            "We could not enable notifications. Please try again.",
        });
      } finally {
        setNotificationLoading(false);
      }

      return;
    }

    // ==================================================
    // DISABLE NOTIFICATIONS
    // ==================================================

    setValue(
      "notifications_enabled",
      false,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      "fcm_token",
      null,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    console.log(
      "[Notifications] Notifications disabled."
    );
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      {/* ================================================
          Full Name
          ================================================ */}

      <Input
        label="Full Name"
        leftIcon={<User size={20} />}
        required
        placeholder="Enter your full name"
        error={errors.full_name?.message}
        {...register("full_name")}
      />

      {/* ================================================
          Email
          ================================================ */}

      <Input
        label="Email Address"
        leftIcon={<Mail size={20} />}
        disabled
        helperText="Email cannot be changed."
        {...register("email")}
      />

      {/* ================================================
          Phone
          ================================================ */}

      <Input
        label="Phone Number"
        leftIcon={<Phone size={20} />}
        required
        placeholder="Enter phone number"
        error={errors.phone?.message}
        {...register("phone")}
      />

      {/* ================================================
          Account Role
          ================================================ */}

      <Input
        label="Account Role"
        leftIcon={<ShieldCheck size={20} />}
        disabled
        {...register("role")}
      />

      {/* ================================================
          KYC Status
          ================================================ */}

      <Input
        label="KYC Status"
        leftIcon={<BadgeCheck size={20} />}
        disabled
        {...register("kyc_status")}
      />

      {/* ================================================
          Notification Preference
          ================================================ */}

      <div className="flex items-center justify-between rounded-xl border bg-white p-4">
        <div className="flex items-center gap-3">
          <Bell
            size={20}
            className="text-blue-600"
          />

          <div>
            <h3 className="font-semibold">
              Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive account notifications.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={notificationsEnabled}
          aria-label={
            notificationsEnabled
              ? "Disable account notifications"
              : "Enable account notifications"
          }
          disabled={notificationLoading}
          onClick={handleNotificationToggle}
          className={`relative h-7 w-16 rounded-full transition-colors ${
            notificationLoading
              ? "cursor-wait opacity-60"
              : "cursor-pointer"
          } ${
            notificationsEnabled
              ? "bg-blue-600"
              : "bg-gray-300"
          }`}
        >
          {/* Toggle knob */}

          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              notificationsEnabled
                ? "translate-x-10"
                : "translate-x-1"
            }`}
          />

          {/* Loading spinner */}

          {notificationLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </span>
          )}
        </button>
      </div>

      {/* ================================================
          Save Changes
          ================================================ */}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !isDirty ||
          notificationLoading
        }
      >
        Save Changes
      </Button>
    </form>
  );
}






/*

// src/features/users/components/PersonalInformationForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  Bell,
} from "lucide-react";

// Firebase messaging + notification permission handler
import { messaging } from "../../../config/firebase/config";
import { requestNotificationPermission } from "../../../config/utils/permissionHandler";

import {
  Button,
  Input,
  Alert,
} from "../../../shared/components/ui";

import { userProfileSchema } from "../schemas/user.schema";

// TODO: Replace with your actual VAPID key from:
// Firebase Console > Project Settings > Cloud Messaging
const VAPID_KEY =
  "BK7w5f-Ojg2ARwgdqjHTULPzXtzOoBCP8xgaERTxYheCTQevXN-k0EKcNBp1AJ_lenaMjME1v1Rg55IWamYNdf0";

export default function PersonalInformationForm({
  profile,
  mutation,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onTouched",

    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      role: "",
      kyc_status: "",
      notifications_enabled: false,
      fcm_token: null,
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      full_name: profile.full_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      role: profile.role ?? "",
      kyc_status: profile.kyc_status ?? "",
      notifications_enabled:
        profile.notifications_enabled ?? false,
      fcm_token: profile.fcm_token ?? null,
    });
  }, [profile, reset]);

  const notificationsEnabled = watch(
    "notifications_enabled"
  );

  const handleNotificationToggle = async () => {
    const targetValue = !notificationsEnabled;

    /*
     * ENABLE
     * ------
     * We only enable notifications after:
     * 1. Browser permission is granted
     * 2. An FCM token is successfully obtained
     *
    if (targetValue) {
      const result = await requestNotificationPermission(
        messaging,
        VAPID_KEY
      );

      if (
        result.status === "granted" &&
        result.fcmToken
      ) {
        setValue(
          "notifications_enabled",
          true,
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );

        setValue(
          "fcm_token",
          result.fcmToken,
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );

        return;
      }

      /*
       * Permission was denied, blocked, or an error
       * occurred. Do not leave a stale token in state.
       *
      setValue(
        "notifications_enabled",
        false,
        {
          shouldDirty: false,
          shouldValidate: true,
        }
      );

      setValue(
        "fcm_token",
        null,
        {
          shouldDirty: false,
          shouldValidate: true,
        }
      );

      Alert({
        type: "warning",
        title: "Notifications Disabled",
         message:
          "Notification permission was not granted.",
      });

      return;
    }

    /*
     * DISABLE
     * -------
     * The backend receives notifications_enabled=false
     * and a null token, allowing it to invalidate/remove
     * the user's FCM token.
     *
    setValue(
      "notifications_enabled",
      false,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );

    setValue(
      "fcm_token",
      null,
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      {/* ... (Your existing Name, Email, Phone, Role, KYC inputs remain unchanged) ... *}

      <Input
        label="Full Name"
        leftIcon={<User size={20} />}
        required
        placeholder="Enter your full name"
        error={errors.full_name?.message}
        {...register("full_name")}
      />

      <Input
        label="Email Address"
        leftIcon={<Mail size={20} />}
        disabled
        helperText="Email cannot be changed."
        {...register("email")}
      />

      <Input
        label="Phone Number"
        leftIcon={<Phone size={20} />}
        required
        placeholder="Enter phone number"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Account Role"
        leftIcon={<ShieldCheck size={20} />}
        disabled
        {...register("role")}
      />

      <Input
        label="KYC Status"
        leftIcon={<BadgeCheck size={20} />}
        disabled
        {...register("kyc_status")}
      />

      {/* Notification preference *}

      <div className="flex items-center justify-between rounded-xl border bg-white p-4">
        <div className="flex items-center gap-3">
          <Bell
            size={20}
            className="text-blue-600"
          />

          <div>
            <h3 className="font-semibold">
              Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive account notifications.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={notificationsEnabled}
          aria-label="Enable account notifications"
          onClick={handleNotificationToggle}
          className={`relative h-7 w-16 rounded-full transition-colors ${
            notificationsEnabled
              ? "bg-blue-600"
              : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              notificationsEnabled
                ? "translate-x-10"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !isDirty
        }
      >
        Save Changes
      </Button>
    </form>
  );
}












/*
// src/features/users/components/PersonalInformationForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell } from "lucide-react";

// Import Firebase messaging and the new handler
import { messaging } from "../../../config/firebase/config";
import { requestNotificationPermission } from "../../../config/utils/permissionHandler";
import { Button, Input, Alert } from "../../../shared/components/ui";
import { userProfileSchema } from "../schemas/user.schema";

// TODO: Replace with your actual VAPID key from Firebase Console > Project Settings > Cloud Messaging
const VAPID_KEY = "BK7w5f-Ojg2ARwgdqjHTULPzXtzOoBCP8xgaERTxYheCTQevXN-k0EKcNBp1AJ_lenaMjME1v1Rg55IWamYNdf0";

export default function PersonalInformationForm({ profile, mutation, onSubmit }) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch, 
    setValue, 
    formState: { errors, isDirty } 
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      role: "",
      kyc_status: "",
      notifications_enabled: false,
      fcm_token: null, // <-- Add this to default values
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      full_name: profile.full_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      role: profile.role ?? "",
      kyc_status: profile.kyc_status ?? "",
      notifications_enabled: profile.notifications_enabled ?? false,
      fcm_token: profile.fcm_token ?? null,
    });
  }, [profile, reset]);

  const notificationsEnabled = watch("notifications_enabled");

  const handleNotificationToggle = async () => {
    const targetValue = !notificationsEnabled;

    if (targetValue) {
      // User is trying to ENABLE notifications
      const result = await requestNotificationPermission(messaging, VAPID_KEY);

      if (result.status === 'granted' && result.fcmToken) {
        // ✅ SUCCESS: Permission granted AND token collected.
        // We update BOTH the enabled state and the token.
        setValue("notifications_enabled", true, { shouldDirty: true });
        setValue("fcm_token", result.fcmToken, { shouldDirty: true });
        
        // Optional: Show a quick success toast
        // Alert({ type: "success", title: "Enabled", message: "Notifications are now active." });
      } else {
        // ❌ FAILURE: Permission denied, blocked, or error.
        // We explicitly keep/set it to false and show an alert. NO token is saved.
        setValue("notifications_enabled", false, { shouldDirty: false });
        setValue("fcm_token", null, { shouldDirty: false });
        
        Alert({
          type: "warning",
          title: "Notifications Disabled",
          message: result.message,
        });
      }
    } else {
      // User is manually turning it OFF. 
      // We clear the token from the form state so the backend knows to remove it.
      setValue("notifications_enabled", false, { shouldDirty: true });
      setValue("fcm_token", null, { shouldDirty: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* ... (Your existing Name, Email, Phone, Role, KYC inputs remain unchanged) ... *}

      <div className="flex items-center justify-between rounded-xl border bg-white p-4">
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-blue-600" />
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-gray-500">Receive account notifications.</p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={notificationsEnabled}
          onClick={handleNotificationToggle}
          className={`relative h-7 w-16 rounded-full transition-colors ${
            notificationsEnabled ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              notificationsEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation?.isPending}
        disabled={mutation?.isPending || !isDirty}
      >
        Save Changes
      </Button>
    </form>
  );
}







/*






// src/features/users/components/PersonalInformationForm.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  Bell,
} from "lucide-react";

import { Button } from "../../../shared/components/ui";
import { Input } from "../../../shared/components/ui";
import { Alert } from "../../../shared/components/ui";

import { userProfileSchema } from "../schemas/user.schema";

export default function PersonalInformationForm({
  profile,
  mutation,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      role: "",
      kyc_status: "",
      notifications_enabled: false,
    },
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      full_name: profile.full_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      role: profile.role ?? "",
      kyc_status: profile.kyc_status ?? "",
      notifications_enabled:
        profile.notifications_enabled ?? false,
    });
  }, [profile, reset]);

  const notificationsEnabled = watch(
    "notifications_enabled"
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >

      <Input
        label="Full Name"
        leftIcon={<User size={20} />}
        required
        placeholder="Enter your full name"
        error={errors.full_name?.message}
        {...register("full_name")}
      />

      <Input
        label="Email Address"
        leftIcon={<Mail size={20} />}
        disabled
        helperText="Email cannot be changed."
        {...register("email")}
      />

      <Input
        label="Phone Number"
        leftIcon={<Phone size={20} />}
        required
        placeholder="Enter phone number"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Account Role"
        leftIcon={<ShieldCheck size={20} />}
        disabled
        {...register("role")}
      />

      <Input
        label="KYC Status"
        leftIcon={<BadgeCheck size={20} />}
        disabled
        {...register("kyc_status")}
      />

      <div
        className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          bg-white
          p-4
        "
      >
        <div className="flex items-center gap-3">
          <Bell
            size={20}
            className="text-blue-600"
          />

          <div>
            <h3 className="font-semibold">
              Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive account notifications.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setValue(
              "notifications_enabled",
              !notificationsEnabled,
              {
                shouldDirty: true,
              }
            )
          }
          className={`
            relative
            h-7
            w-16
            rounded-full
            transition-colors
            ${
              notificationsEnabled
                ? "bg-blue-600"
                : "bg-gray-300"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              h-5
              w-5
              rounded-full
              bg-white
              shadow
              transition-transform
              ${
                notificationsEnabled
                  ? "translate-x-6"
                  : "translate-x-1"
              }
            `}
          />
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={mutation?.isPending}
        disabled={
          mutation?.isPending ||
          !isDirty
        }
      >
        Save Changes
      </Button>
    </form>
  );
}

*/