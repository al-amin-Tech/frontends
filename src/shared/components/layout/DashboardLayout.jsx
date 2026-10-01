// src/shared/components/layout/DashboardLayout.jsx

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

export default function DashboardLayout() {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-110"> 

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      <div className="lg:ml-64">

        {/* Top Header */}
        <Header />
         
        {/* Main Content */}
        <main
          className="
            min-h-[calc(100vh-72px)]
            px-4
            py-6
            pb-24
            md:px-6
            lg:px-8
          "
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>

    </div>
  );
}


/*

// src/shared/components/layout/DashboardLayout.jsx

import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      {/* Desktop Sidebar *}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Dashboard Area *}
      <div className="lg:ml-64">

        {/* Top Header *}
        <Header />

        {/* Main Content *}
        <main
          className="
            min-h-[calc(100vh-72px)]
            px-4
            py-6
            pb-24
            md:px-6
            lg:px-8
          "
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Mobile Bottom Navigation *}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>

    </div>
  );
}
*/