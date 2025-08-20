import React, { createContext, useState, ReactNode, useContext } from "react";
import  type { FeedbackFormData } from "../types/feedback.types";

interface FeedbackContextType {
  data: FeedbackFormData;
  setData: (data: FeedbackFormData) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  return (
    <FeedbackContext.Provider value={{ data, setData }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used within FeedbackProvider");
  return context;
};
