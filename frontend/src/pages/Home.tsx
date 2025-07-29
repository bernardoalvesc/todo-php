import { useEffect, useState } from "preact/hooks";
import type { Task } from "../types/Task";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">(
    "all"
  );
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Erro ao carregar tarefas");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 To-Do List</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Criar nova tarefa</h2>
        <TaskForm onTaskCreated={fetchTasks} />
      </section>

      <section className="mb-4">
        <FilterBar selected={filter} onChange={setFilter} />
      </section>

      {loading ? (
        <p className="text-gray-500">Carregando tarefas...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </main>
  );
}
