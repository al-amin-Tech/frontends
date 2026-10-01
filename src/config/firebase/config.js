// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging"; // <-- Add this
const firebaseConfig = {
  apiKey: "AIzaSyBnSndL4oYxHW4oNTeVDHqg7IotOB2UMlY",
  authDomain: "fir-5fd46.firebaseapp.com",
  projectId: "fir-5fd46",
  storageBucket: "fir-5fd46.firebasestorage.app",
  messagingSenderId: "664169651383",
  appId: "1:664169651383:web:c5e415ec2cbfd2ad3b4132",
  measurementId: "G-M3HS5QRZTD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Messaging (only if supported in the current environment)
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export { app, analytics, messaging };