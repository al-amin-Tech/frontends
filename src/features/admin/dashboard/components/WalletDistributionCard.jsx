// src/features/admin/dashboard/components/WalletDistributionCard.jsx
// TODO: Adjust path
import { Card, Skeleton } from '../../../../shared/components/ui'; 
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  users: '#4f46e5',    // Indigo
  agents: '#f59e0b',   // Amber
  vendors: '#8b5cf6',  // Purple
  api_users: '#06b6d4' // Cyan
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm">
        <p className="font-semibold text-gray-900 capitalize">{data.name.replace('_', ' ')}</p>
        <p className="text-indigo-600 font-bold">₦{Number(data.value).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
};

export default function WalletDistributionCard({ data, isLoading }) {
  if (isLoading) {
    return <Card className="p-6"><Skeleton className="h-64 w-full" /></Card>;
  }

  if (!data) return null;

  // Safely parse string numbers from backend (e.g., "66525.00")
  const chartData = [
    { name: 'users', value: parseFloat(data.users_balance || 0) },
    { name: 'agents', value: parseFloat(data.agents_balance || 0) },
    { name: 'vendors', value: parseFloat(data.vendors_balance || 0) },
    { name: 'api_users', value: parseFloat(data.api_users_balance || 0) },
  ].filter(item => item.value > 0);

  const totalBalance = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Wallet Distribution</h3>
      <p className="text-sm text-gray-500 mb-6">Platform balance by user role</p>

      <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-500 font-medium">Total</span>
            <span className="text-lg font-extrabold text-gray-900">
              ₦{totalBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-3">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
                <span className="text-gray-600 capitalize">{entry.name.replace('_', ' ')}</span>
              </div>
              <span className="font-semibold text-gray-900">
                ₦{Number(entry.value).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}