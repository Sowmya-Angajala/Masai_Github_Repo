import React, { useEffect, useState, useCallback } from "react";
import Post from "./components/Post";

function App() {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [optimized, setOptimized] = useState(false); // Toggle optimization ON/OFF

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Add Post
  const addPost = () => {
    if (!title || !body) return;
    const newPost = {
      id: Date.now(),
      title,
      body,
      verifyPost: false,
    };
    setPosts((prev) => [...prev, newPost]);
    setTitle("");
    setBody("");
  };

  // Toggle Verify Handler
  const toggleVerify = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
      )
    );
  };

  // Optimized version of toggleVerify using useCallback
  const toggleVerifyOptimized = useCallback((id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
      )
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Performance Optimization in React</h2>
      <p>⏱ Timer: {timer}</p>

      <div>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setOptimized(!optimized)}>
          {optimized ? "Switch to Before Optimization" : "Switch to After Optimization"}
        </button>
      </div>

      <h3>{optimized ? "After Optimization" : "Before Optimization"}</h3>

      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            toggleVerify={optimized ? toggleVerifyOptimized : toggleVerify}
            optimized={optimized}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
