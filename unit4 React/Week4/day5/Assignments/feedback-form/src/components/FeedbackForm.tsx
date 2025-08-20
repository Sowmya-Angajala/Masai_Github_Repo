import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackForm: React.FC = () => {
  const { data, setData } = useFeedback();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!data.name || !data.email || !data.rating || !data.feedback) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    navigate("/summary");
  };

  return (
    <div className="p-6 max-w-lg mx-auto shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={data.name}
        onChange={handleChange}
        className="border w-full p-2 mb-3 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={data.email}
        onChange={handleChange}
        className="border w-full p-2 mb-3 rounded"
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={data.rating}
        onChange={handleChange}
        className="border w-full p-2 mb-3 rounded"
      />
      <textarea
        name="feedback"
        placeholder="Your Feedback"
        value={data.feedback}
        onChange={handleChange}
        className="border w-full p-2 mb-3 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default FeedbackForm;
