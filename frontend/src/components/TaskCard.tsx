import type { JSX } from "preact/jsx-runtime";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

type Props = {
  task: Task;
  children?: JSX.Element;
};

export default function TaskCard({ task, children }: Props) {
  const color = {
    low: "border-green-500 bg-green-50",
    medium: "border-yellow-500 bg-yellow-50",
    high: "border-red-500 bg-red-50",
  }[task.priority];

  return (
    <li className={`p-4 rounded shadow border-l-4 ${color}`}>
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">{task.description}</p>
      <span className="text-xs text-gray-500">Prioridade: {task.priority}</span>
      {children}
    </li>
  );
}
