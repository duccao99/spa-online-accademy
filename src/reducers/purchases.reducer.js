import {
  SET_ALL_COURSES_PURCHASED,
  ADD_PURCHASED,
} from "../actionTypes/purchase.type";

const initState = {
  purchased_id_list: [],
};

const purchasedCourseReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ALL_COURSES_PURCHASED:
      return {
        ...state,
        purchased_id_list: action.payload,
      };
    case ADD_PURCHASED:
      return {
        ...state,
        purchased_id_list: state.purchased_id_list.concat(action.payload),
      };

    default:
      return state;
  }
};

export default purchasedCourseReducer;
