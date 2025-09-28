import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'unknown', //'unknown','refreshing','authenticated','guest'
  accessToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Call when access token changed: if returns null then assigned as guest
    setAccessToken(state, action) {
      const token = action.payload ?? null;
      state.accessToken = token;
      state.status = token ? 'authenticated' : 'guest';
      state.error = null;
    },

    //At the begining of refresh/ During bootstrapping
    setRefreshing(state) {
      state.status = 'refreshing';
      state.error = null;
    },

    //Until session verification completed
    setUnknown(state) {
      state.status = 'unknown';
      state.error = null;
    },

    //Clearly set status as a guest. (Logout, refresh 401 etc.)
    setGuest(state) {
      state.status = 'guest';
      state.accessToken = null;
      state.error = null;
    },

    //Succesful session (Login/refresh)
    setAuthenticated(state, action) {
      const token = action?.payload?.accessToken ?? state.accessToken ?? null;
      state.status = 'authenticated';
      state.accessToken = token;
      state.error = null;
    },

    //Optional error log
    setAuthError(state, action) {
      state.error = action.payload ?? null;
    },

    //Reset
    resetAuth() {
      return { ...initialState, status: 'guest' };
    },
  },
});

export const {
  setAccessToken,
  setRefreshing,
  setUnknown,
  setGuest,
  setAuthenticated,
  setAuthError,
  resetAuth,
} = authSlice.actions;

export const getAccessToken = (state) => state.auth.accessToken;

export const selectAuthStatus = (state) => state.auth.status;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) =>
  state.auth.status === 'authenticated';
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
