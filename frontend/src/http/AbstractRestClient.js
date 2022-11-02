import axiosInstance from './axiosConfig';
import store from '../store/store';

export default class AbstractRestClient {
  instance;
  store;

  constructor() {
    this.instance = axiosInstance;
    this.store = store;
  }
}
