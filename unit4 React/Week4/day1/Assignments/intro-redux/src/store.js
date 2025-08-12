// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

import { createStore } from 'redux';
import counterReducer from './counterReducer';

const store = createStore(counterReducer);

export default store;
