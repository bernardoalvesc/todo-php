import type { Task, Subtask } from "../../types/index";
import TaskCardSubtaskForm from "./taskCardSubtaskForm";
import TaskCardSubtaskList from "./taskCardSubtaskList";

/**
 * Props for the TaskCard component.
 */
type Props = {
  task: Task; // Task data to be displayed
  onDelete: (id: number) => void; // Callback for deleting the task
  onSubtaskCreated: () => void; // Callback triggered after creating a subtask
  subtasks: Subtask[]; // List of subtasks associated with the task
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
  // Determine the left border color based on the task's priority
  const borderColor =
    task.priority === "high"
      ? "bg-red-500"
      : task.priority === "medium"
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <li className="relative bg-white rounded-xl shadow-md p-5 font-nunito overflow-hidden">
      {/* Colored side border to indicate priority */}
      <span
        className={`absolute top-0 left-0 h-full w-1.5 ${borderColor} rounded-l-md`}
      />

      {/* Header with title and delete button */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Task description */}
      <p className="text-sm text-gray-700 mt-1">{task.description}</p>

      {/* Metadata section */}
      <div className="text-xs text-gray-500 mt-2 space-y-0.5">
        <p>
          📌 Priority: <span className="capitalize">{task.priority}</span>
        </p>
        <p>🕒 Created at: {new Date(task.created_at).toLocaleString()}</p>
      </div>

      {/* Embedded form to create a new subtask */}
      <TaskCardSubtaskForm
        taskId={task.id}
        onSubtaskCreated={onSubtaskCreated}
      />

      {/* List of existing subtasks */}
      <TaskCardSubtaskList subtasks={subtasks} />
    </li>
  );
}
