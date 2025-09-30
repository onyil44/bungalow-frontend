import axios from 'axios';
import store from '../store';
import { setAccessToken } from '../features/authentication/authSlice';
import { ENV } from '../../config/env';

const rawAuth = axios.create({
  baseURL: `${ENV.API_AUTH_URL + ENV.API_VER}`,
  withCredentials: true,
});

//One channel refresh promise
let refreshPromise = null;

export async function refreshTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = rawAuth
      .post(`auth/token`) //NO INTERCEPTOR
      .then((res) => {
        const { accessToken } = res.data || {};
        store.dispatch(setAccessToken(accessToken || null));
        return accessToken;
      })
      .catch((err) => {
        //Refresh failed: delete the token in client side
        store.dispatch(setAccessToken(null));
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
