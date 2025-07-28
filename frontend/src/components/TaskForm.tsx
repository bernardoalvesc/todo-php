import { useState } from "preact/hooks";
import type { Task } from "../types/Task.ts";

type Props = {
  onTaskCreated: () => void;
};

export default function TaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("low");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPriority("low");
      onTaskCreated();
    } else {
      console.error("Erro ao criar tarefa");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        className="w-full p-2 border rounded"
        placeholder="Título"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Descrição"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
      />
      <select
        className="w-full p-2 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.currentTarget.value as Task["priority"])}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Tarefa
      </button>
    </form>
  );
}
