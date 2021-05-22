import {
  ADD_SALES_INTO_GLOBAL_STATE,
  GET_ALL_COURSES_SALE,
} from "../actionTypes/course.type";

const initState = {
  all_courses_sale: [],
};

const courseReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_COURSES_SALE:
      return {
        ...state.all_courses_sale,
      };
    case ADD_SALES_INTO_GLOBAL_STATE:
      return {
        all_courses_sale: action.payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
