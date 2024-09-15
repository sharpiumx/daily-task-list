import React, { createContext, useState, useEffect } from "react";

// Task Context
export const TaskContext = createContext();

// Leverage Context
export const LeverageContext = createContext();

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState("");
  const [cachedText, setCachedText] = useState([]);
  const [leverage, setLeverage] = useState(false); // Manage leverage state
  const [difficulty, setDifficulty] = useState("");
  const [priority, setPriority] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormFilled =
      difficulty &&
      priority &&
      estimatedTime.value &&
      estimatedTime.unit !== "Select";
    setIsFormValid(isFormFilled);
  }, [difficulty, priority, estimatedTime]);

  function addItem(newTask) {
    setCachedText((prevItems) => [...prevItems, newTask]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = {
      text: task,
      difficulty: difficulty,
      priority: priority,
      estimatedTime: estimatedTime,
    };

    if (task) {
      addItem(newTask); // Add the whole task object
      setTask("");
      setLeverage(true);
    }

    // Reset the form values
    setDifficulty("");
    setPriority("");
    setEstimatedTime("");
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        difficulty,
        setDifficulty,
        priority,
        setPriority,
        estimatedTime,
        setEstimatedTime,
        cachedText,
        handleSubmit,
        isFormValid,
      }}
    >
      <LeverageContext.Provider value={{ leverage, setLeverage }}>
        {children}
      </LeverageContext.Provider>
    </TaskContext.Provider>
  );
};
