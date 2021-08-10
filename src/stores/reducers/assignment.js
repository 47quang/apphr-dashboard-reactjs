import { REDUX_STATE } from '../states';

const initialState = {
  assignments: {
    payload: [],
    total: 0,
  },
  assignment: {},
  assignmentsInADate: [],
  personChart: {
    labels: [],
    datasets: [],
  },
  chart: {},
};

const assignmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.assignment.SET_ASSIGNMENTS:
      return { ...state, assignments: payload };
    case REDUX_STATE.assignment.SET_ASSIGNMENT_IN_A_DATE:
      return { ...state, assignmentsInADate: payload };
    case REDUX_STATE.assignment.SET_ASSIGNMENT:
      return { ...state, assignment: payload };
    case REDUX_STATE.assignment.CREATE_ASSIGNMENT:
      return {
        ...state,
        assignments: {
          payload: [...state.assignments.payload, payload],
          total: state.assignments.total + 1,
        },
      };
    case REDUX_STATE.assignment.DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: {
          payload: state.assignments.payload.filter((b) => b.id !== payload.id),
          total: state.assignments.total - 1,
        },
      };
    case REDUX_STATE.assignment.EMPTY_VALUE:
      return {
        ...state,
        assignments: payload,
      };
    case REDUX_STATE.assignment.EMPTY_ASSIGNMENT:
      return { ...state, assignment: payload };
    case REDUX_STATE.assignment.EMPTY_ASSIGNMENT_IN_A_DATE:
      return { ...state, assignmentsInADate: [] };
    case REDUX_STATE.assignment.SET_PERSON_CHART:
      return { ...state, personChart: payload };
    case REDUX_STATE.assignment.SET_EMPTY_PERSON_CHART:
      return { ...state, personChart: initialState.personChart };
    case REDUX_STATE.assignment.SET_STATISTIC_CHART:
      return { ...state, chart: payload };
    case REDUX_STATE.assignment.SET_EMPTY_STATISTIC_CHART:
      return { ...state, chart: initialState.chart };
    default:
      return state;
  }
};

export default assignmentReducer;
