import { useMemo } from 'react';

const rules = [
  {
    label: '8+ Characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'Uppercase Letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Lowercase Letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'Special Character',
    test: (password) =>
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export default function PasswordStrength({
  password = '',
}) {
  const passedRules = useMemo(
    () => rules.filter((rule) => rule.test(password)).length,
    [password]
  );

  const percentage = Math.round(
    (passedRules / rules.length) * 100
  );

  const strength =
    percentage < 40
      ? 'Weak'
      : percentage < 80
      ? 'Medium'
      : 'Strong';

  return (
    <div className="space-y-3">
      <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background:
              percentage < 40
                ? '#ef4444'
                : percentage < 80
                ? '#f59e0b'
                : '#22c55e',
          }}
        />
      </div>

      <small className="font-medium">
        Password Strength: {strength}
      </small>

      <ul className="space-y-1 text-sm">
        {rules.map((rule) => {
          const passed = rule.test(password);

          return (
            <li
              key={rule.label}
              className={
                passed
                  ? 'text-green-600'
                  : 'text-gray-500'
              }
            >
              {passed ? '✓' : '•'} {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}