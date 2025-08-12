import { createStore, applyMiddleware } from "redux";
import { coffeeReducer } from "./reducers";
import { thunk } from "redux-thunk";
export const store = createStore(coffeeReducer, applyMiddleware(thunk));
