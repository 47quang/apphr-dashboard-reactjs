import { REDUX_STATE } from '../states';

const initialState = {
  wages: [],
  wage: {
    id: 0,
    name: '',
    code: '',
    type: '',
    amount: '',
    dayOff: 0,
  },
};

const wageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.wage.SET_WAGES:
      return { ...state, wages: payload };
    case REDUX_STATE.wage.SET_WAGE:
      return { ...state, wage: Object.assign({}, state.wage, payload) };
    case REDUX_STATE.wage.DELETE_WAGE:
      return {
        ...state,
        wages: state.wages.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.wage.EMPTY_VALUE:
      return {
        ...state,
        wage: initialState.wage,
      };
    default:
      return state;
  }
};

export default wageReducer;
