import type { Task } from "../../types/Task";

export type SubtaskFormProps = {
  tasks: Task[];
  onSubtaskCreated: () => void;
};
