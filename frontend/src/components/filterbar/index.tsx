import { FILTER_OPTIONS } from "./filterOptions";
import type { FilterBarProps } from "./types"; //  garantir que a tipagem será removida após o build, otimizando a saída e evitando conflitos.

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 font-nunito justify-center">
      {FILTER_OPTIONS.map((opt) => {
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
