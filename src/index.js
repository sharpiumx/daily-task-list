import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css"; // Relative to src/index.js
import App from "./App"; // Relative to src/index.js
import { TaskProvider } from "./context"; // Relative to src/index.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
