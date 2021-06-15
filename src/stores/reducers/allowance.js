import { REDUX_STATE } from '../states';

const initialState = {
  allowances: {
    payload: [],
    total: 0,
  },
  allowance: {
    id: 0,
    name: '',
    code: '',
    amount: '',
    type: '',
    bound: '',
  },
};

const allowanceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.allowance.SET_ALLOWANCES:
      return { ...state, allowances: payload };
    case REDUX_STATE.allowance.SET_ALLOWANCE:
      return { ...state, allowance: Object.assign({}, state.allowance, payload) };
    case REDUX_STATE.allowance.DELETE_ALLOWANCE:
      return {
        ...state,
        allowances: state.allowances.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.allowance.EMPTY_VALUE:
      return {
        ...state,
        allowance: initialState.allowance,
      };
    case REDUX_STATE.allowance.EMPTY_LIST:
      return {
        ...state,
        allowances: [],
      };
    default:
      return state;
  }
};

export default allowanceReducer;
