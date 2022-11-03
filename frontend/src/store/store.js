import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
/* I am conscious that today, we'll migrate to react toolkit, and createStore is deprecated but in use
 * yet I still haven't studied toolkit as profoundly to use it here with confidence. */
const store = createStore(persistedReducer, composedEnhancer)

export default store;
export const persistor = persistStore(store);