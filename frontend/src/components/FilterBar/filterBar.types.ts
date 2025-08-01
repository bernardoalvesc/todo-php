/**
 * Props for the FilterBar component.
 */
export interface FilterBarProps {
  /**
   * The currently selected filter value.
   * Example values: "all", "low", "medium", "high"
   */
  selected: string;

  /**
   * Callback function triggered when the user selects a new filter option.
   * Receives the selected filter value as an argument.
   */
  onChange: (filter: "all" | "low" | "medium" | "high") => void;
}
