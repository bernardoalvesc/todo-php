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
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border px-3 py-2"
        placeholder="Título"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
      />
      <textarea
        className="w-full border px-3 py-2"
        placeholder="Descrição"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
      />
      <select
        className="w-full border px-3 py-2"
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Tarefa
      </button>
    </form>
  );
}
