import { REDUX_STATE } from '../states';

const initialState = {
  actions: [],
};

const headerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.header.CHANGE_ACTIONS:
      return { ...state, actions: payload };

    default:
      return state;
  }
};

export default headerReducer;
