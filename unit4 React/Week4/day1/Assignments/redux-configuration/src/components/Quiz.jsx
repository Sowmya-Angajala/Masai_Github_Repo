import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, updateScore } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const { questions, loading } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  const handleAnswer = (correct) => {
    if (correct) dispatch(updateScore(1));
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      navigate("/result");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!questions.length) return <p>No quiz available</p>;

  const q = questions[index];
  return (
    <div>
      <h2>Question {index + 1}</h2>
      <p>{q.question}</p>
      {q.options.map((opt, i) => (
        <button key={i} onClick={() => handleAnswer(opt === q.correct_option)}>
          {opt}
        </button>
      ))}
      <button onClick={() => handleAnswer(false)}>Skip</button>
    </div>
  );
}
