import React from "preact/compat";
import { TaskProvider } from "../../context/TaskContext/taskContext.tsx";

/**
 * Props for the ContextsWrapper component.
 */
interface Props {
  /**
   * React/Preact children elements that will be wrapped by the providers.
   */
  children: React.ReactNode;
}

/**
 * ContextsWrapper component that wraps children with all necessary context providers.
 * This centralizes context composition in a single place, making it easier to scale
 * and maintain global state logic.
 *
 * Currently wraps:
 * - TaskProvider: provides global task and subtask state
 */
const ContextsWrapper = ({ children }: Props) => {
  return <TaskProvider>{children}</TaskProvider>;
};

export default ContextsWrapper;
