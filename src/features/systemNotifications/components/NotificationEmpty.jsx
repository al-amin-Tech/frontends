import { BellOff } from "lucide-react";

import { Card } from "../../../shared/components/ui";

export default function NotificationEmpty() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center py-12 text-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
          <BellOff size={28} />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          No Notifications
        </h2>

        <p className="mt-2 max-w-sm text-sm text-gray-500">
          You're all caught up. New
          notifications will appear here.
        </p>

      </div>
    </Card>
  );
}