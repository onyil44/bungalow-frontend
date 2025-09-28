import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editedCabinId: null,
};

const cabinSlice = createSlice({
  name: "cabin",
  initialState,
  reducers: {
    setEditedCabinId(state, action) {
      state.editedCabinId = action.payload;
    },
    clearEditedCabinId(state) {
      state.editedCabinId = null;
    },
  },
});

export const { setEditedCabinId, clearEditedCabinId } = cabinSlice.actions;

export const getEditedCabintId = (state) => state.cabin.editedCabinId;

export default cabinSlice.reducer;
