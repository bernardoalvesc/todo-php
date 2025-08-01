import React from "preact/compat";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { Task, Subtask, Priority } from "../types";
import type { ComponentChildren } from "preact";

/**
 * Defines the shape of the TaskContext and what it provides to components.
 */
interface TaskWithSubtasks extends Task {
  subtasks: Subtask[];
}

interface TaskContextType {
  tasks: TaskWithSubtasks[];
  loading: boolean;
  filter: Priority | "all";
  setFilter: (filter: Priority | "all") => void;
  fetchAll: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

// Creates the context with an initial value of undefined.
const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * TaskProvider wraps the application and provides shared state and logic
 * related to tasks and their associated subtasks.
 */
export const TaskProvider = ({ children }: { children: ComponentChildren }) => {
  const [tasks, setTasks] = useState<TaskWithSubtasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Priority | "all">("all");

  /**
   * Fetches all tasks and subtasks from the API.
   * Merges subtasks into their respective parent tasks before updating state.
   */
  const fetchAll = async () => {
    try {
      setLoading(true);

      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      const taskData: Task[] = await taskRes.json();
      const subtaskData: Subtask[] = await subtaskRes.json();

      // Group subtasks under their respective parent tasks
      const tasksWithSubtasks = taskData.map((task) => ({
        ...task,
        subtasks: subtaskData.filter((s) => s.parent_id === task.id),
      }));

      setTasks(tasksWithSubtasks);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a task by ID and refreshes the list.
   */
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      await fetchAll();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, filter, setFilter, fetchAll, handleDelete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Custom hook to access the TaskContext safely.
 * Ensures it is used within a TaskProvider.
 */
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a <TaskProvider>");
  }
  return context;
};
