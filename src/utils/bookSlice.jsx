import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
    },
    updateBook: (state, action) => {
      const index = state.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;
