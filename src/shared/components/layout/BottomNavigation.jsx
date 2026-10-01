// src/shared/components/layout/BottomNavigation.jsx
import { BOTTOM_NAVIGATION } from "../../constants/navigation";
import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        bg-white
        md:hidden
      "
    >
      
      <div className="grid"
  style={{ gridTemplateColumns: `repeat(${BOTTOM_NAVIGATION.length}, minmax(0, 1fr))` }}
>

        {BOTTOM_NAVIGATION.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex
                  flex-col
                  items-center
                  gap-1
                  py-3
                  text-xs
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                `
              }
            >
              <Icon size={22} />

              <span>{item.label}</span>

            </NavLink>
          );
        })}

      </div>
    </nav>
  );
}