/**
 * List of available filter options for task priority.
 *
 * Each option includes:
 * - `label`: the text displayed in the UI
 * - `value`: the internal value used for filtering logic
 */
export const FILTER_OPTIONS: {
  label: string;
  value: "all" | "high" | "medium" | "low";
}[] = [
  { label: "Todas", value: "all" }, // Show all tasks
  { label: "Alta", value: "high" }, // High priority tasks
  { label: "Media", value: "medium" }, // Medium priority tasks
  { label: "Baixa", value: "low" }, // Low priority tasks
];
