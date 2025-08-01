/**
 * Represents the priority level of a task or subtask.
 * - "low": Low priority
 * - "medium": Medium priority
 * - "high": High priority
 */
export type Priority = "low" | "medium" | "high";

/**
 * Represents a task in the system.
 */
export interface Task {
  /** Unique identifier of the task */
  id: number;

  /** Title of the task */
  title: string;

  /** Description of the task */
  description: string;

  /** Priority level of the task */
  priority: Priority;

  /** Timestamp when the task was created (ISO string) */
  created_at: string;

  /** ID of the parent task, if this is a subtask; otherwise null */
  parent_id: number | null;
}

/**
 * Represents a subtask linked to a parent task.
 */
export interface Subtask {
  /** Unique identifier of the subtask */
  id: number;

  /** Title of the subtask */
  title: string;

  /** Optional description of the subtask */
  description?: string;

  /** Priority level of the subtask */
  priority: Priority;

  /** Timestamp when the subtask was created (ISO string) */
  created_at: string;

  /** ID of the parent task that this subtask belongs to */
  parent_id: number;
}
