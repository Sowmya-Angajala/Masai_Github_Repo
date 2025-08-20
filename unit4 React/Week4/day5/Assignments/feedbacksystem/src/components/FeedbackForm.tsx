import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../store";
import { addFeedback } from "../store/feedbackSlice";
import type { FeedbackFormData } from "../types/feedback";
import { formatISO } from "date-fns";

const FeedbackForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: FeedbackFormData = {
      id: uuidv4(),
      name,
      email,
      rating,
      comment,
      createdAt: formatISO(new Date()),
    };
    dispatch(addFeedback(payload));
    setName("");
    setEmail("");
    setRating(5);
    setComment("");
  }

  return (
    <form
      onSubmit={submit}
      className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Leave Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email (optional)"
          className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-lg">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        placeholder="Your feedback"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded min-h-[120px] focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
      />

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-5 rounded transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
