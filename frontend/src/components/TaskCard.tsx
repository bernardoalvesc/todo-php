import type { Task } from "../types/Task";
interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <li className="border rounded p-4 shadow">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-400 mt-2">Prioridade: {task.priority}</p>
      <p className="text-xs text-gray-400">
        Criado em: {new Date(task.created_at).toLocaleString()}
      </p>
    </li>
  );
}
