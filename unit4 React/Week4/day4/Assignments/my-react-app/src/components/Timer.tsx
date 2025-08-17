import React, { useState, useEffect, useRef } from "react";

type TimerStatus = "running" | "stopped" | "idle";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (status === "running") return;
    setStatus("running");
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus("stopped");
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
    setStatus("idle");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h2>Time: {seconds} sec</h2>
      <button onClick={startTimer} disabled={status === "running"}>
        Start
      </button>
      <button onClick={stopTimer} disabled={status !== "running"}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
