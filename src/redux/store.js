import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(ReduxPromise));

export default store;
