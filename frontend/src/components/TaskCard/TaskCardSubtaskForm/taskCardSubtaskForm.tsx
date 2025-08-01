import { useState } from "preact/hooks";
import { useTaskCardSubtaskForm } from "./useTaskCardSubtaskForm.ts";
import React from "preact/compat";

/**
 * TaskCardSubtaskForm renders a small form inside the TaskCard to allow
 * creating a subtask with title, description, and priority.
 */
type Props = {
  taskId: number;
  onSubtaskCreated: () => void;
};

export default function TaskCardSubtaskForm({
  taskId,
  onSubtaskCreated,
}: Props) {
  const {
    handleSubmit,
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
  } = useTaskCardSubtaskForm({ taskId, onSubtaskCreated });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 pt-4 border-t border-gray-300 mt-4"
    >
      <h4 className="text-sm font-semibold">Add Subtask</h4>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
      >
        ➕ Create Subtask
      </button>
    </form>
  );
}
