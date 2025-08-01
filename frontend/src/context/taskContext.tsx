import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { Task, Subtask, Priority } from "../types";

interface TaskContextType {
  tasks: Task[];
  subtasks: Subtask[];
  loading: boolean;
  filter: Priority | "all";
  setFilter: (filter: Priority | "all") => void;
  fetchAll: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({
  children,
}: {
  children: preact.ComponentChildren;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Priority | "all">("all");

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      const taskData = await taskRes.json();
      const subtaskData = await subtaskRes.json();

      setTasks(taskData);
      setSubtasks(subtaskData);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      await fetchAll();
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        subtasks,
        loading,
        filter,
        setFilter,
        fetchAll,
        handleDelete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext deve ser usado dentro de <TaskProvider>");
  return context;
};
