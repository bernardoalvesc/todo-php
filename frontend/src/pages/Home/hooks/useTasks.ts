import { useEffect, useState } from "preact/hooks";
import type { Task, Subtask } from "../../../types";

/**
 * Custom hook that handles fetching, storing, and deleting tasks and subtasks.
 *
 * @returns An object with task data, loading state, and related handlers.
 */
export function useTasks() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State to hold the list of subtasks
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  // Loading indicator state
  const [loading, setLoading] = useState(true);

  /**
   * Fetches all tasks and subtasks from the API in parallel.
   * Updates the state accordingly and handles errors gracefully.
   */
  const fetchAll = async () => {
    setLoading(true);

    try {
      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      if (!taskRes.ok || !subtaskRes.ok) throw new Error("Failed to load data");

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

  /**
   * Deletes a task by its ID and refreshes the list afterwards.
   *
   * @param id - ID of the task to be deleted
   */
  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchAll();
  };

  // Automatically fetch tasks on first render
  useEffect(() => {
    fetchAll();
  }, []);

  // Return the state and handler functions
  return { tasks, subtasks, loading, fetchAll, handleDelete };
}
