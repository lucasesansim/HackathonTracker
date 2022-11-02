import { createStore } from 'redux';
import reducer from './reducer';

/* I am conscious that today, we'll migrate to react toolkit,
 *  but I still haven't studied toolkit as profoundly to use it here. */
const store = createStore(reducer)

export default store;