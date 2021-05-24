import { REDUX_STATE } from '../states';

const initialState = {
  statics: [],
};

const staticReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.static.SET_STATICS:
      return { ...state, statics: payload };
    case REDUX_STATE.static.DELETE_STATIC:
      return {
        ...state,
        statics: state.statics.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.wage.EMPTY_LIST:
      return {
        ...state,
        statics: initialState.statics,
      };
    default:
      return state;
  }
};

export default staticReducer;
