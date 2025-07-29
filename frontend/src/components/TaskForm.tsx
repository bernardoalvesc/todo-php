import { useState } from "preact/hooks";

interface Props {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });

    setTitle("");
    setDescription("");
    setPriority("low");
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 font-nunito">
      <input
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="Título da tarefa"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />

      <textarea
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="Descrição da tarefa"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
      />

      <select
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
      >
        ✅ Criar Tarefa
      </button>
    </form>
  );
}
