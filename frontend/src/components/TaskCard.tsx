import type { Task } from "../types/Task";
interface Props {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <li className="border rounded p-4 shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Excluir
        </button>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-400 mt-2">Prioridade: {task.priority}</p>
      <p className="text-xs text-gray-400">
        Criado em: {new Date(task.created_at).toLocaleString()}
      </p>
    </li>
  );
}
