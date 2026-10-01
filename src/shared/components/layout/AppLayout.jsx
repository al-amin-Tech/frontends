//AppLayout.jsx

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Outlet />
    </div>
  );
}

export default AppLayout;
