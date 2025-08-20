import React from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <FeedbackForm />
          <Filters />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Dashboard />
          <FeedbackList />
        </div>
      </div>
    </div>
  );
};

export default App;
