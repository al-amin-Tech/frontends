export default function DepositSection({ title, children }) {
  if (!children) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="px-1 text-sm font-semibold text-gray-500">
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}