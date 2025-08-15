import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, toggleTask } from "./features/tasks/taskSlice";

function App() {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task List</h2>

      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: "10px 0" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.text}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(removeTask(task.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
