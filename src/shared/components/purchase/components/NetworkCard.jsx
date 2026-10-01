// NetworkCard.jsx

// NetworkCard.jsx

export default function NetworkCard({
  option,
  selected,
  onClick,
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={() => onClick(option.id)}
      className={`
        rounded-2xl
        border
        p-4
        transition-all
        hover:border-blue-400
        hover:shadow-sm
        ${
          selected
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="flex flex-col items-center gap-3">
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt={option.name}
            className="h-10 w-10 object-contain"
          />
        ) : (
          <Icon className="h-10 w-10" aria-label={option.name} />
        )}

        <span className="text-sm font-medium text-gray-700">
          {option.name}
        </span>
      </div>
    </button>
  );
}






/*
export default function NetworkCard({
  option,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(option.id)}
      className={`
        rounded-2xl
        border
        p-4
        transition-all
        hover:border-blue-400
        hover:shadow-sm
        ${
          selected
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 bg-white"
        }
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={option.icon}
          alt={option.name}
          className="h-10 w-10 object-contain"
        />

        <span className="text-sm font-medium text-gray-700">
          {option.name}
        </span>
      </div>
    </button>
  );
}


*/