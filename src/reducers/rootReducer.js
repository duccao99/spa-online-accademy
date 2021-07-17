import { combineReducers } from "redux";
import cartReducer from "./cart.reducer";
import courseReducer from "./course.reducer";
import homeReducer from "./home.reducer";
import purchasedCourseReducer from "./purchases.reducer";

export default combineReducers({
  cartReducer,
  courseReducer,
  homeReducer,
  purchasedCourseReducer,
});
