import { useState } from "preact/hooks";

/**
 * Custom hook that encapsulates the state and logic for creating a new task.
 *
 * @param onTaskCreated - Callback function to be called after a task is successfully created.
 * @returns An object containing input states, their respective setters, and the form submit handler.
 */
export function useTaskForm(onTaskCreated: () => void) {
  // State for the task's title input
  const [title, setTitle] = useState("");

  // State for the task's description input
  const [description, setDescription] = useState("");

  // State for the task's priority selection
  const [priority, setPriority] = useState("low");

  /**
   * Handles the form submission by sending a POST request to create a new task.
   * After a successful response, the form is reset and the parent is notified.
   *
   * @param e - Form submission event
   */
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority }),
    });

    // Reset form fields to default values
    setTitle("");
    setDescription("");
    setPriority("low");

    // Notify the parent component
    onTaskCreated();
  };

  // Expose state and handlers to the component that uses this hook
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
