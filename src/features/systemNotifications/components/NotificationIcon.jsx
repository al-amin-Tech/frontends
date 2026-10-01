
import {
  Bell,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Info,
  RefreshCcw,
  Wallet,
  XCircle,
} from "lucide-react";

const ICON_MAP = {
  info: Info,
  notification: Bell,
  success: CheckCircle2,
  check_circle: CheckCircle2,
  warning: CircleAlert,
  error: XCircle,
  hourglass_empty: Clock3,
  refresh: RefreshCcw,
  wallet: Wallet,
};

export default function NotificationIcon({
  icon,
  type,
}) {
  const Icon =
    ICON_MAP[icon] ||
    ICON_MAP[type] ||
    Bell;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      <Icon
        size={21}
        strokeWidth={2}
      />
    </div>
  );
}
/*
import {
  User,
  Users,
  Shield,
  Lock,
  Landmark,
  BadgeCheck,
  Bell,
  Settings,
  CircleHelp,
  Phone,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";

const ICON_MAP = {
  info: Info,
  notification: Bell,
  success: User,
  check_circle: Users,
  warning: Shield,
  error: Lock,
  hourglass_empty: Landmark,
  refresh: BadgeCheck,
  wallet: Settings,
};

export default function NotificationIcon({
  icon,
  type,
}) {
  const Icon =
    ICON_MAP[icon] ||
    ICON_MAP[type] ||
    Bell;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      <Icon
        size={21}
        strokeWidth={2}
      />
    </div>
  );
}
*/