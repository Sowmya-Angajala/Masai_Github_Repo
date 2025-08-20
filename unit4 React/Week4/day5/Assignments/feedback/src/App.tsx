import React from "react";
import FeedbackForm from "./components/FeedbackForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      <FeedbackForm />
    </div>
  );
};

export default App;
