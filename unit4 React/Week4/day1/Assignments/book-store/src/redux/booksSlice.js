import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    toggleReadStatus: (state, action) => {
      const book = state.find(b => b.id === action.payload);
      if (book) book.isRead = !book.isRead;
    },
    editBook: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.findIndex(b => b.id === id);
      if (index !== -1) state[index] = { ...state[index], ...updatedData };
    },
    deleteBook: (state, action) => {
      return state.filter(b => b.id !== action.payload);
    }
  }
});

export const { addBook, toggleReadStatus, editBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
