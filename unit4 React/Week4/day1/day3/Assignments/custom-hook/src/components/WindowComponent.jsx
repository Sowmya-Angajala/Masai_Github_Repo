import React from "react";
import useWindowSize from "../hooks/useWindowSize";

function WindowComponent() {
  const { width, height } = useWindowSize();

  return (
    <div style={{ margin: "20px" }}>
      <h2>Window Size Tracker</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
}

export default WindowComponent;
