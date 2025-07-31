import { useState } from "preact/hooks";

export function useTaskForm(onTaskCreated: () => void) {
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

  return {
    title,
    description,
    priority,
    setTitle,
    setDescription,
    setPriority,
    handleSubmit,
  };
}
