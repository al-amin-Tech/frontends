// src/features/admin/dashboard/components/StatTile.jsx
// TODO: Adjust path
import { Card, Skeleton } from '../../../../shared/components/ui'; 

const colorVariants = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-l-indigo-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-l-blue-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-l-emerald-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-l-amber-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-l-purple-500' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-l-cyan-500' },
};

export default function StatTile({ title, value, icon: Icon, color = 'indigo', isLoading }) {
  const theme = colorVariants[color] || colorVariants.indigo;

  return (
    <Card className={`p-5 border-l-4 ${theme.border} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-32 mt-1" />
          ) : (
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</p>
          )}
        </div>
        {Icon && !isLoading && (
          <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
}