// src/utils/permissionHandler.js
/*

import { getToken } from "firebase/messaging";

/**
 * Checks and requests browser notification permissions.
 * If granted, it retrieves the FCM token.
 * 
 * @param {Object} messaging - The Firebase messaging instance.
 * @param {string} vapidKey - Your Firebase Cloud Messaging VAPID key.
 * @returns {Promise<{ status: 'granted' | 'denied' | 'blocked' | 'error', fcmToken: string | null, message: string }>}
 *
export const requestNotificationPermission = async (messaging, vapidKey) => {
  try {
    if (!("Notification" in window)) {
      return { status: 'error', fcmToken: null, message: "This browser does not support desktop notifications." };
    }

    // 1. If already granted, just get the token
    if (Notification.permission === 'granted') {
      const token = await getToken(messaging, { vapidKey });
      return { status: 'granted', fcmToken: token, message: "Permission already granted." };
    }

    // 2. If explicitly denied previously, we cannot prompt again via JS
    if (Notification.permission === 'denied') {
      return { status: 'blocked', fcmToken: null, message: "Notifications are blocked. Please enable them in your browser settings." };
    }

    // 3. Request permission
    const permissionResult = await Notification.requestPermission();

    if (permissionResult === 'granted') {
      const token = await getToken(messaging, { vapidKey });
      return { status: 'granted', fcmToken: token, message: "Permission granted." };
    } else {
      return { status: 'denied', fcmToken: null, message: "Permission denied. Notifications will not be enabled." };
    }

  } catch (error) {
    console.error("FCM Permission/Token error:", error);
    return { status: 'error', fcmToken: null, message: "An unexpected error occurred while setting up notifications." };
  }
};


*/
// src/utils/permissionHandler.js

import { getToken } from "firebase/messaging";

/**
 * Checks and requests browser notification permissions.
 * If granted, retrieves the FCM token.
 *
 * IMPORTANT:
 * The returned object keeps the same shape expected by
 * PersonalInformationForm:
 *
 * {
 *   status,
 *   fcmToken,
 *   message
 * }
 *
 * @param {Object} messaging - Firebase messaging instance.
 * @param {string} vapidKey - Firebase Cloud Messaging VAPID key.
 *
 * @returns {Promise<{
 *   status:
 *     | 'granted'
 *     | 'denied'
 *     | 'blocked'
 *     | 'unsupported'
 *     | 'error',
 *   fcmToken: string | null,
 *   message: string,
 *   error?: Error | unknown
 * }>}
 */
export const requestNotificationPermission = async (
  messaging,
  vapidKey
) => {
  try {
    // --------------------------------------------------
    // 1. Browser support
    // --------------------------------------------------

    if (typeof window === "undefined") {
      return {
        status: "error",
        fcmToken: null,
        message:
          "Notifications are only available in a browser.",
      };
    }

    if (!("Notification" in window)) {
      return {
        status: "unsupported",
        fcmToken: null,
        message:
          "This browser does not support notifications.",
      };
    }

    // --------------------------------------------------
    // 2. Validate Firebase messaging
    // --------------------------------------------------

    if (!messaging) {
      return {
        status: "error",
        fcmToken: null,
        message:
          "Firebase messaging is not initialized.",
      };
    }

    // --------------------------------------------------
    // 3. Validate VAPID key
    // --------------------------------------------------

    if (!vapidKey) {
      return {
        status: "error",
        fcmToken: null,
        message:
          "Firebase VAPID key is missing.",
      };
    }

    // --------------------------------------------------
    // 4. Check current browser permission
    // --------------------------------------------------

    let permission = Notification.permission;

    console.log(
      "[FCM] Current notification permission:",
      permission
    );

    // --------------------------------------------------
    // 5. Already blocked
    // --------------------------------------------------

    if (permission === "denied") {
      console.warn(
        "[FCM] Notifications are blocked by the browser."
      );

      return {
        status: "blocked",
        fcmToken: null,
        message:
          "Notifications are blocked. Please enable them in your browser's site settings.",
      };
    }

    // --------------------------------------------------
    // 6. Ask user for permission
    // --------------------------------------------------

    if (permission === "default") {
      console.log(
        "[FCM] Requesting notification permission..."
      );

      permission =
        await Notification.requestPermission();

      console.log(
        "[FCM] Permission result:",
        permission
      );
    }

    // --------------------------------------------------
    // 7. User did not grant permission
    // --------------------------------------------------

    if (permission !== "granted") {
      return {
        status: "denied",
        fcmToken: null,
        message:
          "Notification permission was not granted.",
      };
    }

    // --------------------------------------------------
    // 8. Permission granted
    // --------------------------------------------------

    console.log(
      "[FCM] Notification permission granted."
    );

    // --------------------------------------------------
    // 9. Get FCM token
    // --------------------------------------------------

    console.log(
      "[FCM] Requesting FCM token..."
    );

    const token = await getToken(messaging, {
      vapidKey,
    });

    // --------------------------------------------------
    // 10. Firebase returned no token
    // --------------------------------------------------

    if (!token) {
      console.error(
        "[FCM] getToken() returned an empty token."
      );

      return {
        status: "error",
        fcmToken: null,
        message:
          "Notification permission was granted, but Firebase could not generate an FCM token.",
      };
    }

    // --------------------------------------------------
    // 11. Success
    // --------------------------------------------------

    console.log(
      "[FCM] FCM token obtained successfully."
    );

    return {
      status: "granted",
      fcmToken: token,
      message:
        "Notifications enabled successfully.",
    };
  } catch (error) {
    // --------------------------------------------------
    // 12. Firebase / service worker / VAPID errors
    // --------------------------------------------------

    console.error(
      "[FCM] Permission/token error:",
      error
    );

    return {
      status: "error",
      fcmToken: null,
      message:
        error?.message ||
        "An unexpected error occurred while setting up notifications.",
      error,
    };
  }
};
