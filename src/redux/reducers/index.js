import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { productsReducer } from "./productsReducer";

export const rootReducers = combineReducers({
    userReducer,
    productsReducer
})