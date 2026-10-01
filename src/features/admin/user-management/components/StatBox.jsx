import React from 'react';

/**
 * StatBox
 *
 * Reusable statistics card for the User Deep Profile.
 *
 * Supported props:
 * @param {string} label       - Stat title
 * @param {React.ReactNode} value - Stat value
 * @param {boolean} highlight  - Applies positive/highlight styling
 * @param {string} className  - Optional additional Tailwind classes
 */
export default function StatBox({
  label,
  value,
  highlight = false,
  className = '',
}) {
  const displayValue =
    value === null || value === undefined || value === ''
      ? '—'
      : value;

  return (
    <div
      className={[
        'rounded-lg border p-4 shadow-sm transition-colors',
        highlight
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-gray-200 bg-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p
        className={[
          'text-xs font-medium uppercase tracking-wide',
          highlight ? 'text-emerald-600' : 'text-gray-500',
        ].join(' ')}
      >
        {label || '—'}
      </p>

      <p
        className={[
          'mt-1 break-words text-lg font-bold',
          highlight ? 'text-emerald-700' : 'text-gray-900',
        ].join(' ')}
      >
        {displayValue}
      </p>
    </div>
  );
}
/*
export default function StatBox({ label, value, highlight = false }) {
  return (
    <Card className={`p-4 ${highlight ? 'bg-indigo-50 border-indigo-100' : ''}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={`mt-1 text-lg font-bold ${highlight ? 'text-indigo-700' : 'text-gray-900'}`}>{value || '0.00'}</p>
    </Card>
  );
}

*/