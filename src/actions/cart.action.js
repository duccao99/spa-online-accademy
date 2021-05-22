import { CHANGE_CART_DATA } from "../actionTypes/cart.type";

const saveCart = (cartData) => ({
  type: CHANGE_CART_DATA,
  payload: cartData,
});

export const handleSaveCartData = (cartData) => (dispatch) => {
  dispatch(saveCart(cartData));
};
