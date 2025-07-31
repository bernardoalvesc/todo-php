export interface FilterBarProps {
  selected: string;
  onChange: (filter: "all" | "low" | "medium" | "high" ) => void;
}
