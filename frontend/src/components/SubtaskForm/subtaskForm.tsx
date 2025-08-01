import { useState } from "preact/hooks";
import type { SubtaskFormProps } from "./subtaskForm.types";
import React from "preact/compat";

/**
 * SubtaskForm component allows users to create a new subtask
 * and link it to an existing parent task.
 *
 * Props:
 * - tasks: list of available parent tasks
 * - onSubtaskCreated: callback called after a successful creation
 */
export default function SubtaskForm({
  tasks,
  onSubtaskCreated,
}: SubtaskFormProps) {
  // State to hold the subtask title input
  const [title, setTitle] = useState("");

  // State to hold the selected parent task ID
  const [parentId, setParentId] = useState<number | null>(null);

  /**
   * Handles form submission: sends POST request to the backend
   * to create a new subtask under the selected parent task.
   */
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!parentId) return alert("Please select a parent task");

    const res = await fetch("/api/subtasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, parent_id: parentId }),
    });

    if (res.ok) {
      setTitle(""); // Clear the input field
      setParentId(null); // Reset the selected parent task
      onSubtaskCreated(); // Notify parent component to refresh data
    } else {
      console.error("Failed to create subtask");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8 font-nunito">
      {/* Dropdown to select the parent task */}
      <select
        value={parentId ?? ""}
        onChange={(e) => setParentId(Number(e.currentTarget.value))}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      >
        <option value="" disabled>
          Select a parent task
        </option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      {/* Input for subtask title */}
      <input
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Subtask title"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        required
      />

      {/* Submit button */}
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 transition text-white font-semibold px-5 py-2 rounded-lg shadow"
      >
        ➕ Add Subtask
      </button>
    </form>
  );
}
