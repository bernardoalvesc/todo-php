import type { Subtask } from "../types/Subtask.ts";

type Props = {
  subtasks: Subtask[];
};

export default function SubtaskList({ subtasks }: Props) {
  if (subtasks.length === 0) return null;

  return (
    <ul className="mt-2 ml-4 pl-4 border-l border-gray-300 space-y-1">
      {subtasks.map((sub) => (
        <li key={sub.id} className="text-sm text-gray-700">
          • {sub.title}
        </li>
      ))}
    </ul>
  );
}
