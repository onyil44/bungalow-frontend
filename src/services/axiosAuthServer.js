import axios from 'axios';
import store from '../store';
import { refreshTokenOnce } from './refreshTokenOnce';

const axiosInstance = axios.create({
  baseURL: `${process.env.API_AUTH_URL + process.env.API_VER}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState()?.auth?.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config || {};
    const url = originalRequest?.url || '';

    const isLogin = url.includes('auth/login');
    const isSignup = url.includes('auth/signup');
    const isToken = url.includes('auth/token'); //!Do not try refresf with token endpoint.

    // If request comes from autth/login, auth/signup or auth/token routes and server responses an error with status code 401 do not send a request to refresh the access token.

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !isLogin &&
      !isSignup &&
      !isToken
    ) {
      originalRequest._retry = true;
      try {
        const newAccess = await refreshTokenOnce();
        if (newAccess) {
          //Update header and send the same request
          originalRequest.headers = {
            ...axios(originalRequest.headers || {}),
            Authorization: `Bearer ${newAccess}`,
          };
        }
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
