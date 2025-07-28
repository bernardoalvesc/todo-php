type Props = {
  selected: "all" | "low" | "medium" | "high";
  onChange: (priority: "all" | "low" | "medium" | "high") => void;
};

export default function FilterBar({ selected, onChange }: Props) {
  const options: Array<["all" | "low" | "medium" | "high", string]> = [
    ["all", "Todas"],
    ["high", "Alta"],
    ["medium", "Média"],
    ["low", "Baixa"],
  ];

  return (
    <div className="flex gap-2 mb-4">
      {options.map(([value, label]) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1 rounded border ${
            selected === value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
