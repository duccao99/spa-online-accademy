import { combineReducers } from "redux";
import cartReducer from "./cart.reducer";
import courseReducer from "./course.reducer";

export default combineReducers({ cartReducer, courseReducer });
