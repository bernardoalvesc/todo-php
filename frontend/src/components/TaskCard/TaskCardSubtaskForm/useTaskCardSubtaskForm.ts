import {useState} from "preact/compat"

export const useTaskCardSubtaskForm = (props) => {
    const {
        taskId,
        onSubtaskCreated
    } = props;

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

    return {
        handleSubmit,
        title,
        setTitle,
        description,
        setDescription,
        priority,
        setPriority,
    }
}
