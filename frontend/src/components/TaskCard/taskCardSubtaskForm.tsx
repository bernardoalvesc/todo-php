import { useState } from "preact/hooks";

/**
 * Props for the TaskCardSubtaskForm component.
 */
type Props = {
  /**
   * The ID of the parent task to which the subtask will be linked.
   */
  taskId: number;

  /**
   * Callback function to trigger after a subtask is successfully created.
   */
  onSubtaskCreated: () => void;
};

/**
 * TaskCardSubtaskForm renders a small form inside the TaskCard to allow
 * creating a subtask with title, description, and priority.
 */
export default function TaskCardSubtaskForm({
  taskId,
  onSubtaskCreated,
}: Props) {
  // State for the subtask's title input
  const [title, setTitle] = useState("");

  // State for the subtask's description input
  const [description, setDescription] = useState("");

  // State for the subtask's priority selection
  const [priority, setPriority] = useState("low");

  /**
   * Handles form submission by sending a POST request to create a new subtask.
   */
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        parent_id: taskId,
      }),
    });

    // Reset form fields after successful creation
    setTitle("");
    setDescription("");
    setPriority("low");

    // Trigger the parent callback to refresh the task list
    onSubtaskCreated();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 pt-4 border-t border-gray-300 mt-4"
    >
      <h4 className="text-sm font-semibold">Add Subtask</h4>

      {/* Title input field */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Description textarea */}
      <textarea
        placeholder="Description"
        value={description}
        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Priority selector */}
      <select
        value={priority}
        onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}
        className="w-full p-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
      >
        ➕ Create Subtask
      </button>
    </form>
  );
}
