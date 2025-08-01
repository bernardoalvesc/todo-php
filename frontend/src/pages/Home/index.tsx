import { useTaskContext } from "../../context/taskContext";
import TaskForm from "../../components/TaskForm";
import TaskCard from "../../components/TaskCard/taskCard";
import FilterBar from "../../components/FilterBar/filterBar";
import { getSubtasksFor } from "./utils/getSubtasksFor";

/**
 * Home component serves as the main view for the to-do list.
 * It displays a form to create tasks, a filter bar, and the list of filtered tasks.
 * It uses TaskContext to manage and access global task state.
 */
export default function Home() {
  const {
    tasks,
    subtasks,
    loading,
    fetchAll,
    handleDelete,
    filter,
    setFilter,
  } = useTaskContext();

  // Filters tasks based on the currently selected priority
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 font-nunito">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        📝 To do List
      </h1>

      {/* Section to create a new task */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">
          ➕ Create new task
        </h2>
        <TaskForm onTaskCreated={fetchAll} />
      </section>

      {/* Filter buttons for priority */}
      <section className="mb-6">
        <FilterBar selected={filter} onChange={setFilter} />
      </section>

      {/* Display loading, empty state, or the filtered task list */}
      {loading ? (
        <p className="text-gray-500 text-center">⏳ Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">📭 No tasks found.</p>
      ) : (
        <ul className="space-y-5">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onSubtaskCreated={fetchAll}
              subtasks={getSubtasksFor(task.id, subtasks)}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
