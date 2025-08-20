import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer, // slice key = feedback
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;