import { ADD_COURSE_TO_CART, CLEAR_CART } from "../actionTypes/cart.type";
import { REMOVE_COURSE } from "../actionTypes/course.type";

const initState = {
  cart: [],
  quantity: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_COURSE_TO_CART:
      const oldCart = state.cart;
      const newCart = [...oldCart, action.payload];

      return {
        ...state,
        cart: newCart,
        quantity: newCart.length,
      };

    case REMOVE_COURSE:
      const oldCart2 = state.cart;

      const newCart2 = oldCart2.filter(
        (ele) => ele.course_id !== action.payload
      );

      return {
        cart: newCart2,
        quantity: newCart2.length,
      };
    case CLEAR_CART:
      return {
        cart: [],
        quantity: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
