// Import the Subtask type from the shared types
import type { Subtask } from "../../types/index";

/**
 * Props for the SubtaskList component.
 */
export interface SubtaskListProps {
  /**
   * An array of subtasks to be displayed beneath a parent task.
   */
  subtasks: Subtask[];
}
