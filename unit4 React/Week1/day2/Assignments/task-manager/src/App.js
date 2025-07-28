import React, { useState } from "react";

const priorities = ["High", "Medium", "Low"];

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const addTask = () => {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(sortTasks(updatedTasks));
    setTitle("");
    setPriority("Medium");
  };

  const sortTasks = (taskList) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return taskList.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks([...updated]));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Incomplete" && !task.completed);
    return matchPriority && matchStatus;
  });

  return (
    <div style={styles.container}>
      <h2>📝 Advanced Task Manager</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button onClick={addTask} style={styles.addButton}>
          ➕ Add
        </button>
      </div>

      <div style={styles.filters}>
        <label>
          Filter by Priority:{" "}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option>All</option>
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by Status:{" "}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </select>
        </label>
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              ...styles.taskItem,
              backgroundColor:
                task.priority === "High" ? "#ffe4e1" : "#f9f9f9",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <span>
              <strong>[{task.priority}]</strong> {task.title}
            </span>
            <div>
              <button onClick={() => toggleComplete(task.id)} style={styles.doneButton}>
                {task.completed ? "Undo" : "✔"}
              </button>
              <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  select: {
    padding: "8px",
  },
  addButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    alignItems: "center",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  doneButton: {
    marginRight: "8px",
    padding: "4px 8px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "4px 8px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
