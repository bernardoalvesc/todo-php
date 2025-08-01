import React from "preact/compat";
import { useTaskForm } from "./useTaskForm.ts";

/**
 * Props for the TaskForm component.
 */
interface Props {
  /**
   * Callback called after a task is successfully created.
   * Typically used to refresh the task list in the parent component.
   */
  onTaskCreated: () => void;
}

/**
 * TaskForm component renders a form for creating a new task.
 * It uses a custom hook to manage form state and submission logic.
 */
export default function TaskForm({ onTaskCreated }: Props) {
  const {
    title,
    description,
    priority,
    setTitle,
    setDescription,
    setPriority,
    handleSubmit,
  } = useTaskForm(onTaskCreated);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 font-nunito">
      {/* Input for task title */}
      <input
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="Task title"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />

      {/* Textarea for task description */}
      <textarea
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        placeholder="Task description"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
      />

      {/* Select for task priority */}
      <select
        className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
      >
        ✅ Create Task
      </button>
    </form>
  );
}
