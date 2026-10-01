import clsx from "clsx";

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  padding = true,
  bordered = true,
  shadow = true,
  className = "",
  ...props
}) {
  return (
    <div
      {...props}
      className={clsx(
        "overflow-hidden rounded-xl bg-white",
        bordered && "border border-gray-200",
        shadow && "shadow-sm",
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {headerAction && (
            <div className="ml-4">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className={padding ? "p-6" : ""}>
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-100 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}





/*

import clsx from "clsx";

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  padding = true,
  bordered = true,
  shadow = true,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl bg-white",
        bordered && "border border-gray-200",
        shadow && "shadow-sm",
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {headerAction && (
            <div className="ml-4">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className={padding ? "p-6" : ""}>
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-100 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}*/