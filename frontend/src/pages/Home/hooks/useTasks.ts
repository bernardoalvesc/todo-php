import { useEffect, useState } from "preact/hooks";
import type { Task, Subtask } from "../../../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      if (!taskRes.ok || !subtaskRes.ok)
        throw new Error("Erro ao carregar dados");

      const taskData: Task[] = await taskRes.json();
      const subtaskData: Subtask[] = await subtaskRes.json();

      setTasks(taskData);
      setSubtasks(subtaskData);
    } catch (err) {
      console.error(err);
      setTasks([]);
      setSubtasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { tasks, subtasks, loading, fetchAll, handleDelete };
}
