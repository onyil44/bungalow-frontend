import { configureStore } from '@reduxjs/toolkit';
import cabinReducer from './features/cabins/cabinSlice';
import authReducer from './features/authentication/authSlice';
import themeReducer from './features/themes/themeSlice';
import newBookingReducer from './features/bookings/newBookingSlice';

const store = configureStore({
  reducer: {
    cabin: cabinReducer,
    auth: authReducer,
    theme: themeReducer,
    newBooking: newBookingReducer,
  },
  devTools: true,
});

export default store;
