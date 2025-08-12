import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { author: "", genre: "", status: "all" },
  reducers: {
    setAuthor: (state, action) => { state.author = action.payload; },
    setGenre: (state, action) => { state.genre = action.payload; },
    setStatus: (state, action) => { state.status = action.payload; }
  }
});

export const { setAuthor, setGenre, setStatus } = filterSlice.actions;
export default filterSlice.reducer;
