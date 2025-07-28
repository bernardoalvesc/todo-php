import { useState } from "preact/hooks";
import type { Task } from "../types/Task";

type Props = {
  tasks: Task[];
  onSubtaskCreated: () => void;
};

export default function SubtaskForm({ tasks, onSubtaskCreated }: Props) {
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!parentId) return alert("Selecione uma tarefa pai");

    const res = await fetch("/api/subtasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, parent_id: parentId }),
    });

    if (res.ok) {
      setTitle("");
      setParentId(null);
      onSubtaskCreated();
    } else {
      console.error("Erro ao criar subtarefa");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <select
        value={parentId ?? ""}
        onChange={(e) => setParentId(Number(e.currentTarget.value))}
        className="w-full p-2 border rounded"
        required
      >
        <option value="" disabled>
          Selecione uma tarefa pai
        </option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      <input
        className="w-full p-2 border rounded"
        placeholder="Título da subtarefa"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Adicionar Subtarefa
      </button>
    </form>
  );
}
