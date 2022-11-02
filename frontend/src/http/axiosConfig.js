import axios from 'axios';
import { LOGOUT_REQUESTED } from '../store/types'; 
import store from '../store/store';

// Create axios instance
const instance = axios.create({
  timeout: 30000
});

instance.defaults.baseURL = 'http://localhost:8000/';

instance.interceptors.request.use(config => {
  config.headers = { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2NzQxMzg5NCwiZXhwIjoxNjY3NDE3NDk0LCJuYmYiOjE2Njc0MTM4OTQsImp0aSI6IjdQM08xYUtCWGswRXBja1YiLCJzdWIiOjE1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7JypCS87Cotutuij-RoHB_2-MKpTGxuAgisK_9EgvLc'}
  // config.headers.common.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2NzQxMzg5NCwiZXhwIjoxNjY3NDE3NDk0LCJuYmYiOjE2Njc0MTM4OTQsImp0aSI6IjdQM08xYUtCWGswRXBja1YiLCJzdWIiOjE1LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7JypCS87Cotutuij-RoHB_2-MKpTGxuAgisK_9EgvLc'
  if (
    store.getState().auth.isLoggedIn 
  ) {
    config.headers.common.Authorization = `Bearer ${
      store.getState().auth.token
    }`;
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
        // TODO: Token expired, needs to redirect to login screen
        store.dispatch({ type: LOGOUT_REQUESTED, jwtError: true });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
