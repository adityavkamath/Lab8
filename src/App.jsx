import React, { useState } from "react";

const ReminderApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) return;

    const newTask = {
      id: Date.now(),
      taskName,
      dueDate,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskName("");
    setDueDate("");
  };

  const toggleCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="reminder-app">
      <h1 className="app-title">Reminder App</h1>
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          className="task-input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          className="date-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button className="add-button" type="submit">
          Add Task
        </button>
      </form>

      <div className="filter-container">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`filter-button ${filter === "incomplete" ? "active" : ""}`}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-content">
                <div className="task-details">
                  <div className="task-name">{task.taskName}</div>
                  <div className="task-date">Due: {task.dueDate}</div>
                </div>
                <button
                  className="toggle-button"
                  onClick={() => toggleCompletion(task.id)}
                >
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="empty-state">No tasks to display</div>
        )}
      </ul>
    </div>
  );
};

export default ReminderApp;
