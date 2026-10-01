// src/shared/components/layout/Sidebar.jsx
import { SIDEBAR_NAVIGATION } from "../../constants/navigation";
import { NavLink } from "react-router-dom";


export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-64
        flex-col
        border-r
        bg-white
      "
    >
      <div
        className="
          border-b
          px-6
          py-6
        "
      >
        <h1 className="text-2xl font-bold text-blue-600">
          VTU Platform
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Digital Services
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">

        {SIDEBAR_NAVIGATION.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.id}
              to={menu.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {menu.title}
              </span>

            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}