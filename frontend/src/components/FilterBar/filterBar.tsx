// Imports the available filter options (e.g., "all", "low", "medium", "high")
import React from "preact/compat";
import { FILTER_OPTIONS } from ".";

// Imports the prop types (used only at compile time for better DX and tree-shaking)
import type { FilterBarProps } from "./filterBar.types";

/**
 * FilterBar component displays a list of filter buttons (e.g., by priority).
 *
 * Props:
 * - selected: the currently active filter
 * - onChange: callback function to change the selected filter
 */
export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 font-nunito justify-center">
      {FILTER_OPTIONS.map((opt) => {
        const isSelected = selected === opt.value; // Check if the button is the active one

        return (
          <button
            key={opt.value} // Unique key for optimized rendering
            onClick={() => onChange(opt.value)} // Calls the parent handler with selected filter
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${
                isSelected
                  ? "bg-blue-600 text-white ring-2 ring-blue-400" // Active button style
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200" // Inactive button style
              }`}
          >
            {opt.label} {/* Display the label for the filter option */}
          </button>
        );
      })}
    </div>
  );
}
