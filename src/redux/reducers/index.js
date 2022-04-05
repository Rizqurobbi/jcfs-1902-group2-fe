import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { productsReducer } from "./productsReducer";
import { transactionsReducer } from './transactionsReducer'
export const rootReducers = combineReducers({
    userReducer,
    productsReducer,
    transactionsReducer
})