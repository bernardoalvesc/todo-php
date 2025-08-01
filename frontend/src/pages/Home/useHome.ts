import {useTaskContext} from "../../context/TaskContext/taskContext.tsx";

export const useHome = () => {
    const {
        tasks,
        subtasks,
        loading,
        fetchAll,
        handleDelete,
        filter,
        setFilter,
    } = useTaskContext();

    return {
        tasks,
        subtasks,
        loading,
        fetchAll,
        handleDelete,
        filter,
        setFilter,
    }
}
