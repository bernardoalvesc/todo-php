import React from "preact/compat";
import type { Task, Subtask } from "../../types/index";
import TaskCardSubtaskForm from "./TaskCardSubtaskForm/taskCardSubtaskForm.tsx";
import TaskCardSubtaskList from "./TaskCardSubtaskList/taskCardSubtaskList.tsx";

/**
 * Props for the TaskCard component.
 */
type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onSubtaskCreated: () => void;
  subtasks: Subtask[];
};

/**
 * TaskCard component displays a task card with:
 * - title, description, priority, created date
 * - delete button
 * - embedded form to add subtasks
 * - list of subtasks
 */
export default function TaskCard({
  task,
  onDelete,
  onSubtaskCreated,
  subtasks,
}: Props) {
  const borderColor =
    task.priority === "high"
      ? "bg-red-500"
      : task.priority === "medium"
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <li className="relative bg-white rounded-xl shadow-md p-5 font-nunito overflow-hidden">
      <span
        className={`absolute top-0 left-0 h-full w-1.5 ${borderColor} rounded-l-md`}
      />

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          🗑️ Delete
        </button>
      </div>

      <p className="text-sm text-gray-700 mt-1">{task.description}</p>

      <div className="text-xs text-gray-500 mt-2 space-y-0.5">
        <p>
          📌 Priority: <span className="capitalize">{task.priority}</span>
        </p>
        <p>🕒 Created at: {new Date(task.created_at).toLocaleString()}</p>
      </div>

      <TaskCardSubtaskForm
        taskId={task.id}
        onSubtaskCreated={onSubtaskCreated}
      />
      <TaskCardSubtaskList subtasks={subtasks} />
    </li>
  );
}
