// src/features/settings/utils/contactHelpers.js

export function buildContactHref(type, value) {
  if (!value) return null;

  switch (type) {
    case "email":
      return `mailto:${value}`;

    case "phone":
      return `tel:${value}`;

    case "url":
    default:
      return value;
  }
}