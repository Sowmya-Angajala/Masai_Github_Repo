import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonmock.hackerrank.com/api/football_matches?page=2';

export const fetchMatches = createAsyncThunk('matches/fetchMatches', async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    isLoading: false,
    isError: false,
    footballMatches: [],
    favorites: [],
    searchQuery: '',
    filters: {}
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.some(match => match.match_id === action.payload.match_id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(match => match.match_id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.footballMatches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { addFavorite, removeFavorite, setSearchQuery, setFilters } = matchesSlice.actions;
export default matchesSlice.reducer;
