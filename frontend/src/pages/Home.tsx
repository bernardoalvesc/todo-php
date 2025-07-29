import { useEffect, useState } from "preact/hooks";
import type { Task } from "../types/Task";
import type { Subtask } from "../types/Subtask";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import SubtaskForm from "../components/SubtaskForm";
import FilterBar from "../components/FilterBar";
import SubtaskList from "../components/SubtaskList";

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
      const [tasksRes, subtasksRes] = await Promise.all([
        fetch("/api/tasks"),
        fetch("/api/subtasks"),
      ]);

      if (!tasksRes.ok || !subtasksRes.ok)
        throw new Error("Alguma das requisições falhou");

      const tasksData: Task[] = await tasksRes.json();
      const subtasksData: Subtask[] = await subtasksRes.json();

      setTasks(tasksData);
      setSubtasks(subtasksData);
    } catch (err) {
      console.error("Erro ao buscar dados da API:", err);
      setTasks([]);
      setSubtasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  const getSubtasksFor = (taskId: number) =>
    subtasks.filter((s) => s.parent_id === taskId);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 To-Do List</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Criar nova tarefa</h2>
        <TaskForm onTaskCreated={fetchAll} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Adicionar subtarefa</h2>
        <SubtaskForm tasks={tasks} onSubtaskCreated={fetchAll} />
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
            <TaskCard key={task.id} task={task}>
              <SubtaskList subtasks={getSubtasksFor(task.id)} />
            </TaskCard>
          ))}
        </ul>
      )}
    </main>
  );
}
