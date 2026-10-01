// src/features/dashboard/components/QuickActions.jsx
import { QUICK_ACTIONS } from "../../../shared/constants/navigation";



export default function QuickActions({
  onAction,
}) {
  return (
    <section
      className="
        grid
        grid-cols-2
        gap-4
      "
    >
      {QUICK_ACTIONS.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onAction?.(item)}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              p-2.5
              shadow
              transition
              hover:shadow-lg
              hover:-translate-y-1
            "
          >
            <div
              className="
                rounded-xl
                bg-blue-600
                p-3
                text-white
              "
            >
              <Icon size={13} />
            </div>

            <span className="font-semibold">
              {item.label}
            </span>
          </button>
        );
      })}
    </section>
  );
}