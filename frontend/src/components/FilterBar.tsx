interface Props {
  selected: string;
  onChange: (filter: "all" | "low" | "medium" | "high") => void;
}

export default function FilterBar({ selected, onChange }: Props) {
  const options: { label: string; value: "all" | "high" | "medium" | "low" }[] =
    [
      { label: "Todas", value: "all" },
      { label: "Alta", value: "high" },
      { label: "Média", value: "medium" },
      { label: "Baixa", value: "low" },
    ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 font-nunito justify-center">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${
                isSelected
                  ? "bg-blue-600 text-white ring-2 ring-blue-400"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
