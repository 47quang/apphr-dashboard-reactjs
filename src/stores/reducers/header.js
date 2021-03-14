import { CHANGE_ACTIONS } from '../actions/header';

const initialState = {
  actions: [],
};

const headerReducer = (state = initialState, { type, payload }) => {
  if (type === CHANGE_ACTIONS) {
    return { ...state, actions: payload };
  } else {
    return state;
  }
};

export default headerReducer;
