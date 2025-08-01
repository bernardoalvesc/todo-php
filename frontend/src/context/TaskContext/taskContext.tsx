import React from "preact/compat";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { Task, Subtask, Priority } from "../../types";
import { getSubtasksFor } from "./taskContext.helper.ts";

/**
 * Defines the shape of the TaskContext and what it provides to components.
 */
interface TaskContextType {
  tasks: Task[];
  subtasks: Subtask[];
  loading: boolean;
  filter: Priority | "all";
  setFilter: (filter: Priority | "all") => void;
  fetchAll: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

// Creates the context with an initial value of undefined.
// It will be populated inside the provider.
const TaskContext = createContext<TaskContextType | null>(null);

/**
 * TaskProvider wraps the application and provides shared state and logic
 * related to tasks and subtasks.
 */
export const TaskProvider = ({
  children,
}: {
  children: preact.ComponentChildren; // Accepts any Preact children
}) => {
  // Local state for main tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Local state for subtasks
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  // Loading state to indicate whether data is being fetched
  const [loading, setLoading] = useState(true);

  // Currently selected filter (priority level or "all")
  const [filter, setFilter] = useState<Priority | "all">("all");

  /**
   * Fetches all tasks and subtasks from the API.
   * Updates local state with the retrieved data.
   */
  const fetchAll = async () => {
    try {
      setLoading(true); // Set loading to true while fetching

      // Fetch tasks and subtasks in parallel
      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      // Parse the responses as JSON
      const taskData = await taskRes.json();
      const subtaskData = await subtaskRes.json();

      // Update local state
      setTasks(taskData);
      setSubtasks(subtaskData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false); // Stop loading regardless of success/failure
    }
  };

  /**
   * Deletes a task by ID and refreshes the list.
   */
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      await fetchAll(); // Refresh task list after deletion
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Fetch tasks when the provider is first mounted
  useEffect(() => {
    fetchAll();
  }, []);

  const data = {
    tasks,
    subtasks,
    loading,
    filter,
    setFilter,
    fetchAll,
    handleDelete,
  };

  // Provide context value to children
  return <TaskContext.Provider value={data}>{children}</TaskContext.Provider>;
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
