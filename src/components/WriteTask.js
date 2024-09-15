import React, { useContext, useEffect } from "react";
import { TaskContext } from "../context";

export default function WriteTask() {
  const { task, setTask, handleSubmit, isFormValid } = useContext(TaskContext);

  return (
    <div className="write-task">
      <form onSubmit={handleSubmit}>
        <input
          required
          className="task-input"
          placeholder="Enter your tasks here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="task-input-2" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}
