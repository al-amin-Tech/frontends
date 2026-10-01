// src/features/settings/constants/contactItems.js

import { FaWhatsapp } from "react-icons/fa6";
import {
  Send,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  MessageCircle,
  
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const createContact = ({
  key,
  title,
  subtitle,
  icon,
  type = "url",
}) => ({
  key,
  title,
  subtitle,
  icon,
  type,
});

export const SUPPORT_CONTACTS = [
  createContact({
    key: "whatsapp",
    title: "WhatsApp",
    subtitle: "Chat with customer support",
    icon: FaWhatsapp,
  }),

  createContact({
    key: "telegram",
    title: "Telegram",
    subtitle: "Join our support channel",
    icon: Send,
  }),

  createContact({
    key: "facebook",
    title: "Facebook",
    subtitle: "Follow our Facebook page",
    icon: FaFacebook,
  }),

  createContact({
    key: "instagram",
    title: "Instagram",
    subtitle: "Latest updates and news",
    icon: FaInstagram,
  }),

  createContact({
    key: "twitter",
    title: "X (Twitter)",
    subtitle: "Announcements and updates",
    icon: FaXTwitter,
  }),

  createContact({
    key: "email",
    title: "Support Email",
    subtitle: "Send us an email",
    icon: Mail,
    type: "email",
  }),

  createContact({
    key: "phone",
    title: "Phone",
    subtitle: "Talk to customer support",
    icon: Phone,
    type: "phone",
  }),
];

export const DEVELOPER_CONTACTS = [
  createContact({
    key: "github",
    title: "GitHub",
    subtitle: "Open-source projects",
    icon: FaGithub,
  }),

  createContact({
    key: "linkedin",
    title: "LinkedIn",
    subtitle: "Professional profile",
    icon: FaLinkedin,
  }),

  createContact({
    key: "portfolio",
    title: "Portfolio",
    subtitle: "Developer website",
    icon: Globe,
  }),

  createContact({
    key: "email",
    title: "Developer Email",
    subtitle: "Technical enquiries",
    icon: Mail,
    type: "email",
  }),
];

export const FEEDBACK_ITEM = {
  title: "Send Feedback",
  subtitle: "Send a message to the application management (Coming Soon)",
  icon: MessageSquare,
};

export default {
  SUPPORT_CONTACTS,
  DEVELOPER_CONTACTS,
  FEEDBACK_ITEM,
};








/*

import {
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  MessageSquare,
} from "lucide-react";

export const SUPPORT_CONTACTS = [
  {
    key: "whatsapp",
    title: "WhatsApp",
    subtitle: "Chat with customer support",
    icon: MessageCircle,
    type: "url",
  },

  {
    key: "telegram",
    title: "Telegram",
    subtitle: "Join our support channel",
    icon: Send,
    type: "url",
  },

  {
    key: "facebook",
    title: "Facebook",
    subtitle: "Follow our Facebook page",
    icon: Facebook,
    type: "url",
  },

  {
    key: "instagram",
    title: "Instagram",
    subtitle: "Latest updates and news",
    icon: Instagram,
    type: "url",
  },

  {
    key: "twitter",
    title: "X (Twitter)",
    subtitle: "Announcements and updates",
    icon: Twitter,
    type: "url",
  },

  {
    key: "email",
    title: "Support Email",
    subtitle: "Send us an email",
    icon: Mail,
    type: "email",
  },

  {
    key: "phone",
    title: "Phone",
    subtitle: "Talk to customer support",
    icon: Phone,
    type: "phone",
  },
];

export const DEVELOPER_CONTACTS = [
  {
    key: "github",
    title: "GitHub",
    subtitle: "Open-source projects",
    icon: Github,
    type: "url",
  },

  {
    key: "linkedin",
    title: "LinkedIn",
    subtitle: "Professional profile",
    icon: Linkedin,
    type: "url",
  },

  {
    key: "portfolio",
    title: "Portfolio",
    subtitle: "Developer website",
    icon: Globe,
    type: "url",
  },

  {
    key: "email",
    title: "Developer Email",
    subtitle: "Technical enquiries",
    icon: Mail,
    type: "email",
  },
];

export const FEEDBACK_ITEM = {
  title: "Send Feedback",
  subtitle:
    "Send a message to the application management (Coming Soon)",
  icon: MessageSquare,
};

*/
