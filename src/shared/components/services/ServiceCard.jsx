// src/features/dashboard/components/ServiceCard.jsx

export default function ServiceCard({
  title,
  subtitle,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        flex-col
        items-center
        rounded-2xl
        bg-white
        p-1
        shadow
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
        "
      >
        <Icon size={24}/>
      </div>

      <h3 className="mt-2 text-lg font-semibold">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-1 text-center text-sm text-gray-500">
          {subtitle}
        </p>
      )}
    </button>
  );
}