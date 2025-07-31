import { useState } from "preact/hooks";
import type { SubtaskFormProps } from "./subtaskForm.types";

export default function SubtaskForm({
  tasks,
  onSubtaskCreated,
}: SubtaskFormProps) {
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
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 font-nunito">
      <select
        value={parentId ?? ""}
        onChange={(e) => setParentId(Number(e.currentTarget.value))}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Título da subtarefa"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
      >
        ➕ Adicionar Subtarefa
      </button>
    </form>
  );
}
