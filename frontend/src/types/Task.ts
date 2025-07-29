export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  created_at: string;
}
