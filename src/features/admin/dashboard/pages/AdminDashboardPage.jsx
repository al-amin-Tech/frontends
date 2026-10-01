// src/features/admin/dashboard/pages/AdminDashboardPage.jsx
// TODO: Adjust path
import { Users, User, ShieldCheck, Store, Code, Wallet, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';
import StatTile from '../components/StatTile';
import WalletDistributionCard from '../components/WalletDistributionCard';
import ProfitAnalyticsCard from '../components/ProfitAnalyticsCard';
import { useAdminAuth } from '../../auth/hooks/useAdminAuth'; 
import { Card } from '../../../../shared/components/ui';

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const { data, isLoading, isError } = useDashboardStats();
  
  const stats = data?.data|| {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Admin'}. Here is what is happening with your platform today.
          </p>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Failed to load dashboard statistics. Please check your connection or permissions.
        </div>
      )}

      {/* SECTION 1: USER MANAGEMENT STATS */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">User Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatTile 
            title="Total Users" 
            value={stats.total_users?.toLocaleString() || '0'} 
            icon={Users} 
            color="indigo" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Customers" 
            value={stats.total_customers?.toLocaleString() || '0'} 
            icon={User} 
            color="blue" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Agents" 
            value={stats.total_agents?.toLocaleString() || '0'} 
            icon={ShieldCheck} 
            color="amber" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Vendors" 
            value={stats.total_vendors?.toLocaleString() || '0'} 
            icon={Store} 
            color="purple" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="API Users" 
            value={stats.total_api_users?.toLocaleString() || '0'} 
            icon={Code} 
            color="cyan" 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* SECTION 2: FINANCIAL OVERVIEW */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatTile 
            title="Total Balance" 
            value={`₦${stats.total_balance || '0.00'}`} 
            icon={Wallet} 
            color="emerald" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Users Balance" 
            value={`₦${stats.users_balance || '0.00'}`} 
            icon={Wallet} 
            color="blue" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Agents Balance" 
            value={`₦${stats.agents_balance || '0.00'}`} 
            icon={Wallet} 
            color="amber" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="Vendors Balance" 
            value={`₦${stats.vendors_balance || '0.00'}`} 
            icon={Wallet} 
            color="purple" 
            isLoading={isLoading} 
          />
          <StatTile 
            title="API Users Balance" 
            value={`₦${stats.api_users_balance || '0.00'}`} 
            icon={Wallet} 
            color="cyan" 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* SECTION 3: PROFIT & ANALYTICS */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Profit Analytics</h2>
        
        {/* Total Profit Tile */}
        <div className="mb-6">
          <StatTile 
            title="Total Platform Profit" 
            value={`₦${stats.total_profit || '0.00'}`} 
            icon={TrendingUp} 
            color="purple" 
            isLoading={isLoading} 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Distribution Donut Chart */}
          <div className="lg:col-span-1">
            <WalletDistributionCard 
              data={stats} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* Profit Time Series Chart */}
          <div className="lg:col-span-2">
            <ProfitAnalyticsCard />
          </div>
        </div>
      </div>
    </div>
  );
}