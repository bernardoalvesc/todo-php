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
    <div className="flex gap-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded ${
            selected === opt.value ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
