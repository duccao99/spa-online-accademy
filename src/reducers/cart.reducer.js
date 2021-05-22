import { CHANGE_CART_DATA, ADD_COURSE_TO_CART } from "../actionTypes/cart.type";

const initState = {
  cart: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_COURSE_TO_CART:
      const oldCart = state.cart;
      const newCart = [...oldCart, action.payload];

      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
};

export default cartReducer;
