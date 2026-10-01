// src/features/more/components/LogoutButton.jsx

import { LogOut } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import ROUTES from "../../../shared/constants/routes";


export default function LogoutButton({
  onClick,
}) {
  const { user, logout } = useAuth();
    const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="
        w-full
        rounded-2xl
        bg-red-600
        px-5
        py-4
        text-white
        font-semibold
        shadow-sm
        active:scale-[0.98]
        transition
      "
    >
      <div className="flex items-center justify-center gap-2">

        <LogOut size={20} />

        <span>
          Logout
        </span>

      </div>

    </button>
  );
}