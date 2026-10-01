// src/features/admin/layout/AdminHeader.jsx

import { Menu } from 'lucide-react';
import { useAdminAuth } from '../../../features/admin/auth/hooks/useAdminAuth'; 

export default function AdminHeader({ onToggleSidebar }) {
  const { user } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200 shadow-sm md:px-6 lg:px-8">
      {/* Left: Mobile Menu Toggle & Page Context */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Admin'}
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            Here is what is happening with your platform today.
          </p>
        </div>
      </div>

      {/* Right: Actions (Notifications, Profile, etc. can go here) */}
      <div className="flex items-center gap-3">
        {/* Placeholder for future: Notification Bell */}
        {/* <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button> */}
        
        {/* Admin Avatar Badge */}
        <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
          {user?.fullName?.charAt(0).toUpperCase() || 'A'}
        </div>
      </div>
    </header>
  );
}