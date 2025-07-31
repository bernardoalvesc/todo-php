import { useEffect, useState } from "preact/hooks";
import TaskForm from "../../components/TaskForm";
import TaskCard from "../../components/TaskCard/taskCard";
import FilterBar from "../../components/FilterBar/filterBar";
import { useTasks } from "./hooks/useTasks";
import { getSubtasksFor } from "./utils/getSubtasksFor";
import type { Task, Subtask, Priority } from "../../types";

export default function Home() {
  const { tasks, subtasks, loading, fetchAll, handleDelete } = useTasks();
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">(
    "all"
  );

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 font-nunito">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        📝 To do List
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 text-blue-700">
          ➕ Criar nova tarefa
        </h2>
        <TaskForm onTaskCreated={fetchAll} />
      </section>

      <section className="mb-6">
        <FilterBar selected={filter} onChange={setFilter} />
      </section>

      {loading ? (
        <p className="text-gray-500 text-center">⏳ Carregando tarefas...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          📭 Nenhuma tarefa encontrada.
        </p>
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
