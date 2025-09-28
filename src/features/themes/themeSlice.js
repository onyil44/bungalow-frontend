import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = themeSlice.actions;

export const getDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
