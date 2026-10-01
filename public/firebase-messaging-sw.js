// public/firebase-messaging-sw.js
// public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBnSndL4oYxHW4oNTeVDHqg7IotOB2UMlY",
  authDomain: "fir-5fd46.firebaseapp.com",
  projectId: "fir-5fd46",
  storageBucket: "fir-5fd46.firebasestorage.app",
  messagingSenderId: "664169651383",
  appId: "1:664169651383:web:c5e415ec2cbfd2ad3b4132",
  measurementId: "G-M3HS5QRZTD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle =
    payload.notification?.title || "New Notification";

  const notificationOptions = {
    body: payload.notification?.body || "You have a new update.",
    icon: "/favicon.ico",
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});







/*
// 1. Import the specific Service Worker versions of Firebase SDKs
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// 2. Use the exact same config as your main app
const firebaseConfig = {
  apiKey: "AIzaSyBnSndL4oYxHW4oNTeVDHqg7IotOB2UMlY",
  authDomain: "fir-5fd46.firebaseapp.com",
  projectId: "fir-5fd46",
  storageBucket: "fir-5fd46.firebasestorage.app",
  messagingSenderId: "664169651383",
  appId: "1:664169651383:web:c5e415ec2cbfd2ad3b4132",
  measurementId: "G-M3HS5QRZTD"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize Messaging
const messaging = getMessaging(app);

// 5. (Optional but Recommended) Handle background messages
// This runs when the notification arrives while the app is closed/minimized
import { onBackgroundMessage } from "firebase/messaging/sw";

onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message:", payload);
  
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new update.",
    icon: "/favicon.ico", // Optional: path to your app's icon
  };

  // The browser will automatically display this notification
  // self.registration.showNotification(notificationTitle, notificationOptions);
});

*/