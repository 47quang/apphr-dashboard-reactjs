import { REDUX_STATE } from '../states';

const initialState = {
  shifts: [],
  shift: {
    id: 0,
    name: '',
    code: '',
    coefficient: 0,
    startCC: '',
    endCC: '',
    branchId: '',
    operateLoop: [],
    isOvertime: true,
  },
};

export const shiftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.shift.GET_SHIFTS:
      return { ...state, shifts: payload };
    case REDUX_STATE.shift.GET_SHIFT:
      return { ...state, shift: Object.assign({}, state.shift, payload) };
    case REDUX_STATE.shift.SET_SHIFT:
      return { ...state, shift: Object.assign({}, state.shift, payload) };
    case REDUX_STATE.shift.EMPTY_VALUE:
      return { ...state, shift: initialState.shift };
    case REDUX_STATE.shift.RESET_SHIFTS:
      return { ...state, shifts: [] };
    case REDUX_STATE.shift.DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((s) => s.id !== payload.id),
      };
    default:
      return state;
  }
};

export default shiftReducer;
