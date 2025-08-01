import type { SubtaskListProps } from "./subtaskList.types";

/**
 * SubtaskList displays a list of subtasks visually indented under a parent task.
 *
 * Props:
 * - subtasks: array of subtasks to display
 */
export default function SubtaskList({ subtasks }: SubtaskListProps) {
  // If there are no subtasks, render nothing
  if (subtasks.length === 0) return null;

  return (
    <ul className="mt-3 ml-5 pl-4 border-l-2 border-gray-300 space-y-2 font-nunito">
      {subtasks.map((sub) => (
        <li
          key={sub.id} // Unique key for each subtask
          className="text-sm text-gray-700 flex items-start gap-2"
        >
          <span className="text-purple-500">↳</span>{" "}
          {/* Icon to indicate subtask */}
          <span>{sub.title}</span> {/* Subtask title */}
        </li>
      ))}
    </ul>
  );
}
