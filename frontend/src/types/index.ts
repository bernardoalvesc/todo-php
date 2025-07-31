export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  created_at: string;
  parent_id: number | null;
}

export interface Subtask {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  created_at: string;
  parent_id: number;
}
