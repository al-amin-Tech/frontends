

import Swal from "sweetalert2";

const variants = {
  success: {
    icon: "success",
  },

  error: {
    icon: "error",
  },

  warning: {
    icon: "warning",
  },

  info: {
    icon: "info",
  },
};

export default function Alert({
  type = "info",
  title,
  message,
  confirmButtonText = "OK",
}) {
  const style = variants[type] || variants.info;

  return Swal.fire({
    icon: style.icon,
    title,
    text: message,
    confirmButtonText,
    customClass: {
      popup: "rounded-lg",
      confirmButton:
        "bg-blue-600 text-white px-4 py-2 rounded-lg",
    },
  });
}
