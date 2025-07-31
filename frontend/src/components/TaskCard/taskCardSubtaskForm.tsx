import { useState } from "preact/hooks";

type Props = {
  taskId: number;
  onSubtaskCreated: () => void;
};

export default function TaskCardSubtaskForm({
  taskId,
  onSubtaskCreated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        parent_id: taskId,
      }),
    });

    setTitle("");
    setDescription("");
    setPriority("low");
    onSubtaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 pt-4 border-t border-gray-300 mt-4"
    >
      <h4 className="text-sm font-semibold">Adicionar Subtarefa</h4>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
      >
        ➕ Criar Subtarefa
      </button>
    </form>
  );
}
