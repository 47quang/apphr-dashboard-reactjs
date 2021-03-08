import { CHANGE_HEADER_STATE } from "../actions/header";

const initialState = {
  listButtonSubmit: [],
};

const headerReducer = (state = initialState, { type, payload }) => {
  if (type === CHANGE_HEADER_STATE) {
    return { ...state, listButtonSubmit: payload.lst };
  } else {
    return state;
  }
};

export default headerReducer;
