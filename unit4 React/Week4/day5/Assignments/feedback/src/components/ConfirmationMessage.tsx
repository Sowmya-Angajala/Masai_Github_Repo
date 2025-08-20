import React from "react";
import type { FeedbackFormData } from "../types/feedback";

interface ConfirmationMessageProps {
  data: FeedbackFormData;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ data }) => {
  return (
    <div className="p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-2">Thank you for your feedback!</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Feedback:</strong> {data.feedback}</p>
    </div>
  );
};

export default ConfirmationMessage;
