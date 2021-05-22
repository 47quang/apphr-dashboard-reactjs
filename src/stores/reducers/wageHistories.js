import { REDUX_STATE } from '../states';

const initialState = {
  wageHistories: [],
  wageHistory: {},
};

const wageHistoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.wageHistory.SET_WAGE_HISTORIES:
      return { ...state, wageHistories: payload };
    case REDUX_STATE.wageHistory.SET_WAGE_HISTORY:
      return { ...state, wageHistory: payload };
    case REDUX_STATE.wageHistory.DELETE_WAGE_HISTORY:
      return {
        ...state,
        wageHistories: state.wageHistories.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.wageHistory.EMPTY_VALUE:
      return {
        ...state,
        wageHistory: initialState.wageHistory,
      };
    default:
      return state;
  }
};

export default wageHistoryReducer;
