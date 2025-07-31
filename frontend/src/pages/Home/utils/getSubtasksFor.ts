import type { Subtask } from "../../../types";

export function getSubtasksFor(taskId: number, subtasks: Subtask[]) {
  return subtasks.filter((s) => s.parent_id === taskId);
}
