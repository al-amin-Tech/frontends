// src/features/admin/dashboard/components/ProfitAnalyticsCard.jsx
// TODO: Adjust path
import { useState, useMemo } from 'react';
import { Card, Button, Skeleton, Badge } from '../../../../shared/components/ui'; 
import { useTodayProfit } from '../hooks/useTodayProfit';
import { useProfitChart } from '../hooks/useProfitChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const DATE_RANGES = {
  today: { label: 'Today', groupBy: 'hour' }, 
  '7d': { label: 'Last 7 Days', groupBy: 'day' },
  '30d': { label: 'Last 30 Days', groupBy: 'day' },
  '1y': { label: 'Last Year', groupBy: 'month' },
};

const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm">
        <p className="text-gray-500 mb-1">{label}</p>
        <p className="text-indigo-600 font-bold text-lg">₦{Number(payload[0].value).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</p>
        <p className="text-gray-400 text-xs">{payload[0].payload.transaction_count} transactions</p>
      </div>
    );
  }
  return null;
};

export default function ProfitAnalyticsCard() {
  const [activeRange, setActiveRange] = useState('30d');

  // 1. Fetch Today's Profit (Endpoint 2)
  const { data: todayProfitData, isLoading: isTodayProfitLoading } = useTodayProfit();
  const todayProfit = todayProfitData?.data?.total_today_profit || '0.00';

  // 2. Calculate dates for Chart (Endpoint 3)
  const dates = useMemo(() => {
    const end = new Date();
    const start = new Date();
    
    if (activeRange === 'today') {
      // start of today
    } else if (activeRange === '7d') {
      start.setDate(end.getDate() - 7);
    } else if (activeRange === '30d') {
      start.setDate(end.getDate() - 30);
    } else if (activeRange === '1y') {
      start.setFullYear(end.getFullYear() - 1);
    }

    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      groupBy: DATE_RANGES[activeRange].groupBy
    };
  }, [activeRange]);

  const { data: chartDataResponse, isLoading: isChartLoading } = useProfitChart(dates);

  // Format data for Recharts
  const chartData = useMemo(() => {
    if (!chartDataResponse?.data) return [];
    return chartDataResponse.data.map(item => ({
      date: item.period,
      profit: parseFloat(item.profit_naira.replace(/,/g, '')), // Safe parsing
      formattedProfit: item.profit_naira,
      transaction_count: item.transaction_count
    }));
  }, [chartDataResponse]);

  const totalPeriodProfit = chartData.reduce((sum, item) => sum + item.profit, 0);

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            Profit Analytics
            {isTodayProfitLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <Badge variant="success" size="sm">Today: ₦{todayProfit}</Badge>
            )}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isChartLoading ? 'Loading chart...' : `Period Total: ₦${totalPeriodProfit.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {Object.entries(DATE_RANGES).map(([key, { label }]) => (
            <Button
              key={key}
              variant={activeRange === key ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveRange(key)}
              className="whitespace-nowrap"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        {isChartLoading ? (
          <Skeleton className="h-full w-full" />
        ) : chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No profit data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Area type="monotone" dataKey="profit" stroke="none" fill="url(#colorProfit)" />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#4f46e5" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}