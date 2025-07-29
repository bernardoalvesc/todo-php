import { useState } from "preact/hooks";
import type { Task } from "../types/Task";
import type { Subtask } from "../types/Subtask";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onSubtaskCreated: () => void;
  subtasks: Subtask[];
}

export default function TaskCard({
  task,
  onDelete,
  onSubtaskCreated,
  subtasks,
}: Props) {
  const [subTitle, setSubTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [subPriority, setSubPriority] = useState("low");

  const handleSubtaskSubmit = async (e: Event) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: subTitle,
        description: subDescription,
        priority: subPriority,
        parent_id: task.id,
      }),
    });

    setSubTitle("");
    setSubDescription("");
    setSubPriority("low");
    onSubtaskCreated();
  };

  return (
    <li className="border rounded p-4 shadow space-y-2">
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
      <p className="text-xs text-gray-400 mt-1">Prioridade: {task.priority}</p>
      <p className="text-xs text-gray-400">
        Criado em: {new Date(task.created_at).toLocaleString()}
      </p>

      {/* Subtask form */}
      <form
        onSubmit={handleSubtaskSubmit}
        className="space-y-2 pt-3 border-t mt-3"
      >
        <h4 className="text-sm font-semibold">Adicionar Subtarefa</h4>
        <input
          type="text"
          placeholder="Título"
          value={subTitle}
          onInput={(e) => setSubTitle((e.target as HTMLInputElement).value)}
          className="w-full p-1 border text-sm rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={subDescription}
          onInput={(e) =>
            setSubDescription((e.target as HTMLTextAreaElement).value)
          }
          className="w-full p-1 border text-sm rounded"
        />
        <select
          value={subPriority}
          onChange={(e) =>
            setSubPriority((e.target as HTMLSelectElement).value)
          }
          className="w-full p-1 border text-sm rounded"
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
        <button
          type="submit"
          className="bg-purple-500 text-white py-1 px-2 rounded text-sm hover:bg-purple-600"
        >
          Criar Subtarefa
        </button>
      </form>

      {/* Subtasks list */}
      {subtasks.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-semibold mb-1">Subtarefas</h4>
          <ul className="space-y-1 text-sm list-disc list-inside text-gray-700">
            {subtasks.map((sub) => (
              <li key={sub.id}>
                <span className="font-medium">{sub.title}</span> —{" "}
                {sub.description}{" "}
                <span className="text-xs text-gray-400">({sub.priority})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
