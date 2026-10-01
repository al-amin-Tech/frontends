// src/features/notifications/components/SupportNotice.jsx

import {
  Clock,
  Mail,
  MessageCircle,
} from "lucide-react";

function Item({
  icon: Icon,
  title,
  children,
}) {
  return (
    <div className="flex gap-4">

      <div
        className="
          rounded-xl
          bg-blue-100
          p-3
          text-blue-600
          h-fit
        "
      >
        <Icon size={20} />
      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <div className="mt-1 text-sm text-gray-500">
          {children}
        </div>

      </div>

    </div>
  );
}

export default function SupportNotice() {
  return (
    <section
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        space-y-6
      "
    >
      <div>

        <h2 className="text-lg font-semibold">
          Need More Help?
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          If your issue cannot wait, contact our
          support team directly.
        </p>

      </div>

      <Item
        icon={Mail}
        title="Support Email"
      >
        support@yourcompany.com
      </Item>

      <Item
        icon={Clock}
        title="Business Hours"
      >
        Monday – Friday
        <br />
        8:00 AM – 6:00 PM
      </Item>

      <Item
        icon={MessageCircle}
        title="Support Messages"
      >
        Messages submitted from this page are
        reviewed by our support team and responded
        to as quickly as possible.
      </Item>

    </section>
  );
}