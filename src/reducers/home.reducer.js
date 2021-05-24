import { BRING_SCROLLBAR_BACK } from "./../actionTypes/home.type";

const initState = {
  isShowScrollbar: true,
};

const homeReducer = (state = initState, action) => {
  switch (action.type) {
    case BRING_SCROLLBAR_BACK:
      return {
        ...state,
        isShowScrollbar: !state.isShowScrollbar,
      };
    default:
      return state;
  }
};

export default homeReducer;
