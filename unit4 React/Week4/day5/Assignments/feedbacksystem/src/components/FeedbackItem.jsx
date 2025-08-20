import React from "react";

const FeedbackItem = ({ item }) => {
  return (
    <div className="p-3 border rounded mb-2 bg-white">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">
            {item.name} <span className="text-sm text-gray-500">({item.rating}★)</span>
          </div>
          <div className="text-sm text-gray-500">{item.createdAt}</div>
        </div>
      </div>
      <p className="mt-2">{item.comment}</p>
    </div>
  );
};

export default FeedbackItem;
