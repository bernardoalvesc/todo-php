import type { Subtask } from "../../../types";

/**
 * Returns all subtasks that belong to a specific parent task.
 *
 * @param taskId - The ID of the parent task
 * @param subtasks - Full list of available subtasks
 * @returns An array of subtasks linked to the given taskId
 */
export function getSubtasksFor(taskId: number, subtasks: Subtask[]) {
  return subtasks.filter((s) => s.parent_id === taskId);
}
