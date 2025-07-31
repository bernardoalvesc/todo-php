import { useEffect, useState } from "preact/hooks";
import type { Task } from "../types/Task";
import type { Subtask } from "../types/Subtask";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar/filterBar";
import Footer from "../components/Footer";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">(
    "all"
  );
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [taskRes, subtaskRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      if (!taskRes.ok || !subtaskRes.ok)
        throw new Error("Erro ao carregar dados");

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

  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const getSubtasksFor = (taskId: number) =>
    subtasks.filter((s) => s.parent_id === taskId);

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <>
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
                subtasks={getSubtasksFor(task.id)}
              />
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </>
  );
}
