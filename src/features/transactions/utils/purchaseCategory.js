const CATEGORY_MAP = {
  data: {
    label: "Data Purchase",
    icon: "📶",
  },

  airtime: {
    label: "Airtime Purchase",
    icon: "📱",
  },

  cable: {
    label: "Cable TV",
    icon: "📺",
  },

  electricity: {
    label: "Electricity",
    icon: "⚡",
  },

  edu_pin: {
    label: "Education PIN",
    icon: "🎓",
  },

  e_pin: {
    label: "E-PIN",
    icon: "🎫",
  },
};

export function getPurchaseCategory(category) {
  if (!category) {
    return {
      label: "Purchase",
      icon: "🧾",
    };
  }

  return (
    CATEGORY_MAP[String(category).toLowerCase()] ?? {
      label: category,
      icon: "🧾",
    }
  );
}

export default getPurchaseCategory;