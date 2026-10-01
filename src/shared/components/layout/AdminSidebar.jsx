// /layout/AdminSidebar.jsx

import { NavLink, useNavigate } from 'react-router-dom';

import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  X,
  ShieldCheck
} from 'lucide-react';

import { ADMIN_ROUTES } from '../../constants/routes'; 
import { useAdminAuth } from '../../../features/admin/auth/hooks/useAdminAuth'; 
import { adminAuthApi } from '../../../features/admin/auth/api/adminAuthApi'; 

// Navigation Configuration
const navItems = [
  { label: 'Dashboard', path: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'User Management', path: ADMIN_ROUTES.USERS, icon: Users },
  { label: 'Transactions', path: '/admin/transactions', icon: CreditCard }, // Placeholder
  { label: 'System Settings', path: '/admin/settings', icon: Settings }, // Placeholder
];

export default function AdminSidebar({ onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();
 // alert(json(user));
  const handleLogout = async () => {
    try {
      await adminAuthApi.logout();  // Call backend to revoke token
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      navigate(ADMIN_ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <aside className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            ₦
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">NairaDesk Ops</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Console</p>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Management
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose} // Close mobile sidebar on navigation
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }
            `}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold text-xs border border-slate-600">
            {user?.fullName?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.fullName || 'Admin'}</p>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1">
              <ShieldCheck size={12} className="text-indigo-400" />
              {user?.role?.replace('_', ' ').toUpperCase() || 'ADMIN'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}