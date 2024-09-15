import React, { useContext } from "react";
import { TaskContext, LeverageContext } from "../context";

const getPriorityValue = (priority) => {
  switch (priority) {
    case "High":
      return 3;
    case "Mid":
      return 2;
    case "Low":
      return 1;
    default:
      return 0;
  }
};

const getDifficultyValue = (difficulty) => {
  switch (difficulty) {
    case "Hard":
      return 3;
    case "Medium":
      return 2;
    case "Easy":
      return 1;
    default:
      return 0;
  }
};

// Convert time to minutes for comparison
const parseTime = (time) => {
  if (typeof time !== "string") {
    console.error("Invalid time format:", time);
    return 0;
  }

  const parts = time.split(" ");
  if (parts.length !== 2) {
    console.error("Unexpected time format:", time);
    return 0;
  }

  const [value, unit] = parts;
  const minutes = unit === "hours" ? parseFloat(value) * 60 : parseFloat(value);
  return isNaN(minutes) ? 0 : minutes;
};

export default function ResultBox() {
  const { cachedText, availableTime } = useContext(TaskContext);
  const { leverage } = useContext(LeverageContext);

  // Ensure availableTime is correctly formatted and parse it
  const availableMinutes = parseTime(availableTime || "0 minutes");

  const sortedTasks = cachedText.slice().sort((a, b) => {
    const estimatedTimeA = parseTime(a.estimatedTime || "0 minutes");
    const estimatedTimeB = parseTime(b.estimatedTime || "0 minutes");

    // Check if tasks fit within available time
    const canFitA = estimatedTimeA <= availableMinutes;
    const canFitB = estimatedTimeB <= availableMinutes;

    // Prioritize tasks that can fit within the available time
    if (canFitA && !canFitB) return -1;
    if (!canFitA && canFitB) return 1;

    // If both fit or neither fits, sort by priority and difficulty
    const priorityDiff =
      getPriorityValue(b.priority || "Low") -
      getPriorityValue(a.priority || "Low");
    const difficultyDiff =
      getDifficultyValue(b.difficulty || "Easy") -
      getDifficultyValue(a.difficulty || "Easy");

    if (priorityDiff !== 0) return priorityDiff;
    if (difficultyDiff !== 0) return difficultyDiff;

    // If priority and difficulty are the same, sort by estimated time (ascending)
    return estimatedTimeA - estimatedTimeB;
  });

  return (
    <div className="result-box">
      <p className={leverage ? "paragraph-visible" : "paragraph-unvisible"}>
        {sortedTasks.map((task, index) => (
          <p key={index} style={{ marginBottom: "10px" }}>
            <span>{`${index + 1}. ${task.text}`}</span>
          </p>
        ))}
      </p>
    </div>
  );
}
