import { REDUX_STATE } from '../states';

const initialState = {
  assignments: [],
  assignment: {
    id: '',
    shiftId: '',
    userId: '',
    date: '',
  },
};

const assignmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.assignment.SET_ASSIGNMENTS:
      return { ...state, assignments: payload };
    case REDUX_STATE.assignment.SET_ASSIGNMENT:
      return { ...state, assignment: Object.assign({}, state.assignment, payload) };
    case REDUX_STATE.assignment.DELETE_ASSIGMENT:
      return {
        ...state,
        assignments: state.assignment.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.assignment.EMPTY_VALUE:
      return {
        ...state,
        assignments: initialState.assignments,
      };
    default:
      return state;
  }
};

export default assignmentReducer;
