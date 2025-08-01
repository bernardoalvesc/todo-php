// Import Task type definition from the shared types
import type { Task } from "../../types/index";

/**
 * Props for the SubtaskForm component.
 */
export type SubtaskFormProps = {
  /**
   * List of parent tasks to which a subtask can be assigned.
   * Used to populate the dropdown selection.
   */
  tasks: Task[];

  /**
   * Callback triggered after a subtask is successfully created.
   * Allows the parent component to refresh the data.
   */
  onSubtaskCreated: () => void;
};
