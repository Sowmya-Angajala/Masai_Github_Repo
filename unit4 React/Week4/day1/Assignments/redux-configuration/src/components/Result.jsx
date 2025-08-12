import { useSelector } from "react-redux";

export default function Result() {
  const score = useSelector((state) => state.quiz.score);
  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>Your Score: {score}</p>
    </div>
  );
}
