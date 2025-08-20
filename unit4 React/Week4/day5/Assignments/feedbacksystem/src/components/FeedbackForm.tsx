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
    setName(""); setEmail(""); setRating(5); setComment("");
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow-md max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Leave Feedback</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={name} onChange={e => setName(e.target.value)} required placeholder="Name" className="p-2 border rounded"/>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email (optional)" className="p-2 border rounded"/>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <label>Rating:</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="p-2 border rounded">
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <textarea value={comment} onChange={e => setComment(e.target.value)} required placeholder="Your feedback" className="mt-3 w-full p-2 border rounded min-h-[100px]"/>

      <div className="mt-3">
        <button type="submit" className="px-4 py-2 rounded bg-sky-600 text-white">Submit</button>
      </div>
    </form>
  );
};

export default FeedbackForm;
