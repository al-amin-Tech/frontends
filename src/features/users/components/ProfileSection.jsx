// src/features/users/components/ProfileSection.jsx

export default function ProfileSection({
  title,
  children,
}) {
  return (
    <section className="space-y-3">

      <h2
        className="
          px-1
          text-lg
          font-bold
          text-gray-900
        "
      >
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>

    </section>
  );
}