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

  const borderColor =
    task.priority === "high"
      ? "bg-red-500"
      : task.priority === "medium"
      ? "bg-yellow-400"
      : "bg-green-500";

  const buttonColor =
    task.priority === "high"
      ? "bg-red-600 hover:bg-red-700"
      : task.priority === "medium"
      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
      : "bg-green-600 hover:bg-green-700";

  return (
    <li className="relative bg-white rounded-xl shadow-md p-5 font-nunito overflow-hidden">
      {/* Barra de prioridade à esquerda */}
      <span
        className={`absolute top-0 left-0 h-full w-1.5 ${borderColor} rounded-l-md`}
      ></span>

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline text-sm"
        >
          🗑️ Excluir
        </button>
      </div>

      <p className="text-sm text-gray-700 mt-1">{task.description}</p>

      <div className="text-xs text-gray-500 mt-2 space-y-0.5">
        <p>📌 Prioridade: <span className="capitalize">{task.priority}</span></p>
        <p>🕒 Criado em: {new Date(task.created_at).toLocaleString()}</p>
      </div>

      {/* Subtask form */}
      <form
        onSubmit={handleSubtaskSubmit}
        className="space-y-3 pt-4 border-t border-gray-300 mt-4"
      >
        <h4 className="text-sm font-semibold">Adicionar Subtarefa</h4>

        <input
          type="text"
          placeholder="Título"
          value={subTitle}
          onInput={(e) => setSubTitle((e.target as HTMLInputElement).value)}
          className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Descrição"
          value={subDescription}
          onInput={(e) =>
            setSubDescription((e.target as HTMLTextAreaElement).value)
          }
          className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={subPriority}
          onChange={(e) =>
            setSubPriority((e.target as HTMLSelectElement).value)
          }
          className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>

        <button
          type="submit"
          className={`${buttonColor} text-white font-semibold px-4 py-2 rounded transition`}
        >
          ➕ Criar Subtarefa
        </button>
      </form>

      {/* Lista de subtarefas */}
      {subtasks.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-semibold mb-2">📋 Subtarefas</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {subtasks.map((sub) => (
              <li
                key={sub.id}
                className="pl-2 border-l-2 border-gray-300 ml-2"
              >
                <span className="font-medium">{sub.title}</span>
                {sub.description && <> — {sub.description}</>}
                <span className="text-xs text-gray-400"> ({sub.priority})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
