import React, { useState } from "react";
import type { FeedbackFormData } from "../types/feedback";
import ConfirmationMessage from "./ConfirmationMessage";

const initialFormData: FeedbackFormData = {
  name: "",
  email: "",
  rating: "",
  feedback: "",
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitted(true);
    
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Feedback Form</h1>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            min={1}
            max={5}
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="feedback"
            placeholder="Your Feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
      ) : (
        <ConfirmationMessage data={formData} />
      )}
    </div>
  );
};

export default FeedbackForm;
