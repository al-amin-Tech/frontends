// src/features/dashboard/components/ServiceGrid.jsx

import ServiceCard from "./ServiceCard";

export default function ServiceGrid({
  title = "Payment Services",
  subtitle = "Daily services available on your account.",
  services = [],
  onServiceClick,
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            icon={service.icon}
            onClick={() => onServiceClick?.(service)}
          />
        ))}
      </div>
    </section>
  );
}



/*


import { DASHBOARD_SERVICES } from "../../../shared/constants/navigation";
import ServiceCard from "./ServiceCard";


export default function ServiceGrid({
  onServiceClick,
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-bold">
          Payment Services
        </h2>

        <p className="text-sm text-gray-500">
          Daily services available on your account.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        {DASHBOARD_SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            icon={service.icon}
            onClick={() =>
              onServiceClick?.(service)
            }
          />
        ))}

      </div>

    </section>
  );
}*/