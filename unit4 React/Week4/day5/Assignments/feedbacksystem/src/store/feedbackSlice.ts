import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FeedbackFormData, FeedbackFilter } from "../types/feedback";
import type { RootState } from "./index";


type FeedbackState = {
  items: FeedbackFormData[];
  filter: FeedbackFilter;
};

const initialState: FeedbackState = {
  items: [],
  filter: {},
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback(state, action: PayloadAction<FeedbackFormData>) {
      state.items.unshift(action.payload);
    },
    updateFeedback(state, action: PayloadAction<FeedbackFormData>) {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteFeedback(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<Partial<FeedbackFilter>>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter(state) {
      state.filter = {};
    },
    importFeedback(state, action: PayloadAction<FeedbackFormData[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addFeedback,
  updateFeedback,
  deleteFeedback,
  setFilter,
  clearFilter,
  importFeedback,
} = feedbackSlice.actions;

export const selectFilteredFeedback = (state: RootState) => {
  const { items, filter } = state.feedback;
  const { rating, from, to, search } = filter;

  return items.filter((item) => {
    if (rating !== undefined && item.rating !== rating) return false;
    if (from && new Date(item.createdAt) < new Date(from)) return false;
    if (to && new Date(item.createdAt) > new Date(to)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !(
          item.name.toLowerCase().includes(q) ||
          item.comment.toLowerCase().includes(q)
        )
      )
        return false;
    }
    return true;
  });
};

export default feedbackSlice.reducer;
