import { useEffect, useState } from "preact/hooks";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar tarefas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;

  return (
    <main className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">📋 Lista de Tarefas</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 rounded shadow border-l-4 ${
                task.priority === "high"
                  ? "border-red-500 bg-red-50"
                  : task.priority === "medium"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-green-500 bg-green-50"
              }`}
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <span className="text-xs text-gray-500">
                Prioridade: {task.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
