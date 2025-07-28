import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(["Buy milk", "Study React"]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const handleClear = () => {
    setTasks([]);
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      <div style={styles.inputSection}>
        <input
          type="text"
          value={input}
          placeholder="Enter a new task"
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>Add</button>
        <button onClick={handleClear} style={styles.clearButton}>Clear All</button>
      </div>

      {tasks.length === 0 ? (
        <p style={styles.empty}>No tasks available.</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.listItem}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  inputSection: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "60%",
    marginRight: "5px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  clearButton: {
    padding: "8px 12px",
    marginLeft: "5px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    textAlign: "left",
  },
  empty: {
    color: "#888",
  },
};

export default App;
