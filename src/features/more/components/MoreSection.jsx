// src/features/more/components/MoreSection.jsx

import MoreMenuItem from "./MoreMenuItem";

export default function MoreSection({
  title,
  items,
  onItemClick,
}) {
  if (!items?.length) return null;

  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <div className="space-y-3">

        {items.map((item) => (
          <MoreMenuItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onClick={() =>
              onItemClick?.(item)
            }
          />
        ))}

      </div>

    </section>
  );
}