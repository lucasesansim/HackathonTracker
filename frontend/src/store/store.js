import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
/* I am conscious that today, we'll migrate to react toolkit, and createStore is deprecated but in use
 * yet I still haven't studied toolkit as profoundly to use it here with confidence. */
const store = createStore(reducer, composedEnhancer)

export default store;