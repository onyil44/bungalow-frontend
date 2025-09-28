import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bungalow: {},
  bookingDetails: {
    startDateUtc: null,
    numGuests: null,
    numNights: null,
    totalPrice: null,
    hasBreakfast: false,
  },
};

const newBookingSlice = createSlice({
  name: 'newBooking',
  initialState,
  reducers: {
    setBungalow(state, action) {
      state.bungalow = action.payload;
    },
    setBookingDetails(state, action) {
      state.bookingDetails.startDateUtc = action.payload.startDateUtc;
      state.bookingDetails.numNights = action.payload.numNights;
      state.bookingDetails.hasBreakfast = action.payload.hasBreakfast;
      state.bookingDetails.numGuests = action.payload.numGuests;
    },
    setBookingDays(state, action) {
      state.bookingDetails.startDateUtc = action.payload.startDate;
      state.bookingDetails.numNights = action.payload.numNights;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload.totalPrice;
    },
    resetNewBooking() {
      return { ...initialState };
    },
  },
});

export const getBookingDetails = (store) => store.newBooking.bookingDetails;

export const getTotalPrice = (store) => store.newBooking.totalPrice;

export const getBungalow = (store) => store.newBooking.bungalow;

export const {
  setBungalow,
  setDates,
  setTotalPrice,
  setBookingDetails,
  setBookingDays,
  resetNewBooking,
} = newBookingSlice.actions;

export default newBookingSlice.reducer;
