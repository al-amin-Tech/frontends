

// src/shared/components/purchase/ValidationAlert.jsx

export default function ValidationAlert({
  success = false,
  title,
  message,
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`
        rounded-xl
        border
        p-4

        ${
          success
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }
      `}
    >
      {title && (
        <h3
          className={`
            mb-1
            font-semibold

            ${
              success
                ? "text-green-700"
                : "text-red-700"
            }
          `}
        >
          {title}
        </h3>
      )}

      <p
        className={
          success
            ? "text-green-700"
            : "text-red-700"
        }
      >
        {message}
      </p>
    </div>
  );
}
