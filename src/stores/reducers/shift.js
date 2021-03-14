import { REDUX_STATE } from '../states';

const initialState = {
  shifts: [],
  shift: {
    name: '',
    shortname: '',
    coefficient: 0,
    startCC: '',
    endCC: '',
    branchIds: [1],
    operateLoop: [],
    typeCC: '',
    isOvertime: true,
  },
};

export const shiftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.shift.GET_SHIFTS:
      return { ...state, shifts: payload };
    case REDUX_STATE.shift.GET_SHIFT:
      return { ...state, shift: payload };
    case REDUX_STATE.shift.SET_SHIFT:
      return { ...state, shift: payload };
    case REDUX_STATE.shift.EMPTY_VALUE:
      return { ...state, shift: initialState };
    default:
      return state;
  }
};

export default shiftReducer;
