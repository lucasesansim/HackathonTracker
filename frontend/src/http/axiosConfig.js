import axios from 'axios';
import store from '../store/store';
import { logout } from '../store/actions';

// Create axios instance
const instance = axios.create({
  timeout: 30000
});

instance.defaults.baseURL = 'http://localhost:8000/';

instance.interceptors.request.use(config => {
  if (
    store.getState().auth.isLoggedIn 
  ) {
    config.headers = {
      Authorization: `Bearer ${store.getState().auth.token}`
    }
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (store.getState().auth.isLoggedIn) {
      if (error.response?.status === 401) {
        // Token expired, needs to redirect to login screen
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
