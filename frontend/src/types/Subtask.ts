export interface Subtask {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  parent_id: number;
}
