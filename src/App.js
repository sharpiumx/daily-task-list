import React from "react";
import { TaskProvider } from "./context";
import WriteTask from "./components/WriteTask";
import SelectProperties from "./components/SelectProperties";
import ResultBox from "./components/ResultBox";

export default function App() {
  return (
    <TaskProvider>
      <div>
        <h1 className="header-1">Order your daily tasks by complexity</h1>
        <WriteTask />
        <SelectProperties />
        <ResultBox />
      </div>
    </TaskProvider>
  );
}
