// SelectField.jsx

export default function SelectField({
  label,
  value,
  options = [],
  placeholder,
  getValue,
  getLabel,
  onChange,
  disabled,
}) {
  return (
    <div className="space-y-2">

      <label className="font-medium">
        {label}
      </label>

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
       w-full
       rounded-xl
       border
       border-blue-600
       p-4
       bg-blue-50
       focus:outline-none
       focus:ring-2
       focus:ring-blue-500
        "
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((item) => (
          <option
            key={getValue(item)}
            value={getValue(item)}
          >
            {getLabel(item)}
          </option>
        ))}

      </select>

    </div>
  );
}