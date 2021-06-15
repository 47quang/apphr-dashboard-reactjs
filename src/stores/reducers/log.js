import { REDUX_STATE } from '../states';

const initialState = {
  data: {
    payload: [],
    total: 0,
  },
};

const logReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.log.SET_LOGS:
      return { ...state, data: payload };
    case REDUX_STATE.log.EMPTY_LIST:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default logReducer;
