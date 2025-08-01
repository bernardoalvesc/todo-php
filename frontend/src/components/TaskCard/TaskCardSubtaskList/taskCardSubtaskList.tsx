import type {Subtask} from "../../../types";

/**
 * Props for the TaskCardSubtaskList component.
 */
type Props = {
    /**
     * Array of subtasks to be displayed.
     */
    subtasks: Subtask[];
};

/**
 * TaskCardSubtaskList renders a list of subtasks for a given parent task.
 * If no subtasks are present, the component renders nothing.
 */
export default function TaskCardSubtaskList({subtasks}: Props) {
    // If there are no subtasks, return null (render nothing)
    if (subtasks.length === 0) {
        return null;
    }

    return (
        <div className="mt-4 border-t pt-3">
            <h4 className="text-sm font-semibold mb-2">📋 Subtarefas</h4>

            <ul className="space-y-2 text-sm text-gray-700">
                {subtasks.map((sub) => (
                    <li key={sub.id} className="pl-2 border-l-2 border-gray-300 ml-2">
                        {/* Subtask title in bold */}
                        <span className="font-medium">{sub.title}</span>

                        {/* Optional description, prefixed with a dash */}
                        {sub.description && <> — {sub.description}</>}

                        {/* Priority in smaller, lighter text */}
                        <span className="text-xs text-gray-400"> ({sub.priority})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
