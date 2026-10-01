const CATEGORY_MAP = {
  referral_reward: {
    label: "Referral Reward",
    icon: "🎁",
  },

  upgrade_account: {
    label: "Account Upgrade",
    icon: "⬆️",
  },

  reversal: {
    label: "Transaction Reversal",
    icon: "↩️",
  },

  wallet_funding: {
    label: "Wallet Funding",
    icon: "💳",
  },

  airtime_purchase: {
    label: "Airtime Purchase",
    icon: "📱",
  },

  data_purchase: {
    label: "Data Purchase",
    icon: "📶",
  },

  cable_purchase: {
    label: "Cable TV",
    icon: "📺",
  },

  electricity_purchase: {
    label: "Electricity",
    icon: "⚡",
  },

  edu_pin_purchase: {
    label: "Education PIN",
    icon: "🎓",
  },

  e_pin_purchase: {
    label: "E-PIN Purchase",
    icon: "🎫",
  },
};

export function getWalletCategory(category) {
  if (!category) {
    return {
      label: "Unknown",
      icon: "❓",
    };
  }

  return (
    CATEGORY_MAP[String(category).toLowerCase()] ?? {
      label: category
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
      icon: "💰",
    }
  );
}

export default getWalletCategory;