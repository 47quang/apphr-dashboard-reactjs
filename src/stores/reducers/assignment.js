import { REDUX_STATE } from '../states';

const initialState = {
  assignments: [],
  assignment: {},
};

const assignmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.assignment.SET_ASSIGNMENTS:
      return { ...state, assignments: payload };
    case REDUX_STATE.assignment.SET_ASSIGNMENT:
      return { ...state, assignment: payload };
    case REDUX_STATE.assignment.DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.assignment.EMPTY_VALUE:
      return {
        ...state,
        assignments: [],
      };
    case REDUX_STATE.assignment.EMPTY_ASSIGNMENT:
      return { ...state, assignment: payload };
    default:
      return state;
  }
};

export default assignmentReducer;
