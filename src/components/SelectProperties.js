import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context";

export default function SelectProperties() {
  const {
    difficulty,
    setDifficulty,
    priority,
    setPriority,
    estimatedTime,
    setEstimatedTime,
  } = useContext(TaskContext);

  // State to manage form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle time conversion to minutes for consistency
  const handleEstimatedTimeChange = (e) => {
    const [value, unit] = e.target.value.split(" ");
    setEstimatedTime({ value: parseFloat(value), unit });
  };

  // Check form validity whenever any value changes
  useEffect(() => {
    const isFormFilled =
      difficulty && priority && estimatedTime.value && estimatedTime.unit;
    setIsFormValid(isFormFilled);
  }, [difficulty, priority, estimatedTime]);

  return (
    <>
      <div className="write-task">
        <p className="textOfSelect">Difficulty: </p>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="select-prop-1"
          required
        >
          <option value="" disabled hidden>
            Select
          </option>
          <option className="textOfProperties">Easy</option>
          <option className="textOfProperties">Medium</option>
          <option className="textOfProperties">Hard</option>
        </select>
      </div>
      <div className="write-task">
        <p className="textOfSelect">Estimated time to finish:</p>
        <input
          required
          value={estimatedTime.value || ""}
          onChange={(e) =>
            handleEstimatedTimeChange({
              target: {
                value: `${e.target.value} ${estimatedTime.unit || "minutes"}`,
              },
            })
          }
          className="select-prop-2"
        />
        <select
          className="select-prop-1"
          value={estimatedTime.unit || "Select"}
          onChange={(e) =>
            handleEstimatedTimeChange({
              target: {
                value: `${estimatedTime.value || ""} ${e.target.value}`,
              },
            })
          }
          required
        >
          <option value="Select" disabled hidden>
            Select
          </option>
          <option className="textOfProperties" value="minutes">
            minutes
          </option>
          <option className="textOfProperties" value="hours">
            hours
          </option>
        </select>
      </div>
      <div className="write-task">
        <p className="textOfSelect">Priority: </p>
        <select
          className="select-prop-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Select
          </option>
          <option className="textOfProperties">High</option>
          <option className="textOfProperties">Mid</option>
          <option className="textOfProperties">Low</option>
        </select>
      </div>
    </>
  );
}
