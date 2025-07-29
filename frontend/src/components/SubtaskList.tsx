import type { Subtask } from "../types/Subtask.ts";

type Props = {
  subtasks: Subtask[];
};

export default function SubtaskList({ subtasks }: Props) {
  if (subtasks.length === 0) return null;

  return (
    <ul className="mt-3 ml-5 pl-4 border-l-2 border-gray-300 space-y-2 font-nunito">
      {subtasks.map((sub) => (
        <li
          key={sub.id}
          className="text-sm text-gray-700 flex items-start gap-2"
        >
          <span className="text-purple-500">↳</span>
          <span>{sub.title}</span>
        </li>
      ))}
    </ul>
  );
}
