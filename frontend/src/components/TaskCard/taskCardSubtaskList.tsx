import type { Subtask } from "../../types/Subtask";

type Props = {
  subtasks: Subtask[];
};

export default function TaskCardSubtaskList({ subtasks }: Props) {
  if (subtasks.length === 0) return null;

  return (
    <div className="mt-4 border-t pt-3">
      <h4 className="text-sm font-semibold mb-2">📋 Subtarefas</h4>
      <ul className="space-y-2 text-sm text-gray-700">
        {subtasks.map((sub) => (
          <li key={sub.id} className="pl-2 border-l-2 border-gray-300 ml-2">
            <span className="font-medium">{sub.title}</span>
            {sub.description && <> — {sub.description}</>}
            <span className="text-xs text-gray-400"> ({sub.priority})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
