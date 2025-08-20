import React from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackSummary: React.FC = () => {
  const { data } = useFeedback();
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-lg mx-auto shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Feedback Summary</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Feedback:</strong> {data.feedback}</p>

      <button
        onClick={() => navigate("/form")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back to Form
      </button>
    </div>
  );
};

export default FeedbackSummary;
