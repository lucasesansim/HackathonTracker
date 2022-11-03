import axios from 'axios';
import store from '../store/store';
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
        alert('Your session has expired. Please log in again.');
        /* Future Versions: better handling with redirect on token expiring should be done.
         * Maybe even dispatching a logout (is bugged if just dispatching logout as is)*/
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
