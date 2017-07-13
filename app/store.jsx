import { createStore, applyMiddleware } from 'redux';
import store from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

// export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
export default createStore(store, applyMiddleware(thunkMiddleware, createLogger()));
export * from './reducers';
