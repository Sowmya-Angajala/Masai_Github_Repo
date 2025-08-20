import React from "react";
import { useSelector } from "react-redux";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = () => {
  const items = useSelector((state) => state.feedback.items);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        Feedback ({items.length})
      </h3>

      {items.length === 0 ? (
        <div className="text-gray-500">No feedback found.</div>
      ) : (
        items.map((item) => <FeedbackItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default FeedbackList;
