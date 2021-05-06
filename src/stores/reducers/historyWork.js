import { REDUX_STATE } from '../states';

const initialState = {
  histories: [],
  history: {},
};

const historyWorkReducer = (state = initialState, { type, payload }) => {
  let index = payload?.index;
  switch (type) {
    case REDUX_STATE.historyWork.SET_HISTORIES:
      return { ...state, histories: payload };
    case REDUX_STATE.historyWork.CREATE_HISTORY:
      return { ...state, histories: [payload, ...state.histories] };
    case REDUX_STATE.historyWork.UPDATE_HISTORY:
      return { ...state, histories: state.histories.map((b) => (b.id === payload.id ? payload : b)) };
    case REDUX_STATE.historyWork.DELETE_HISTORY:
      return {
        ...state,
        histories: state.histories.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.historyWork.EMPTY_VALUE:
      return {
        ...state,
        histories: [],
      };
    case REDUX_STATE.historyWork.GET_DEPARTMENTS:
      delete payload.index;
      state.histories[index].departments = payload;
      return { ...state };
    case REDUX_STATE.historyWork.SET_POSITIONS:
      delete payload.index;
      state.histories[index].positions = payload;
      return { ...state };
    default:
      return state;
  }
};

export default historyWorkReducer;
