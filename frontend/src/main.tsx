import { render } from "preact";
import App from "./app";
import "./index.css";
import { TaskProvider } from "./context/taskContext";

render(
  <TaskProvider>
    <App />
  </TaskProvider>,
  document.getElementById("app")!
);
