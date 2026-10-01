import { useEffect } from "react";
import clsx from "clsx";

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "w-full rounded-xl bg-white shadow-xl",
          sizes[size]
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded p-2 text-gray-500 transition hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        )}

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <div className="border-t px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}