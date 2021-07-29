import { REDUX_STATE } from '../states';

const initialState = {
  departments: { payload: [], total: 0 },
  department: {
    name: '',
    code: '',
    branchId: 0,
    note: '',
  },
  total: 0,
};

const departmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.department.SET_DEPARTMENTS:
      return { ...state, departments: payload };
    case REDUX_STATE.department.SET_DEPARTMENT:
      return {
        ...state,
        department: Object.assign({}, state.department, payload),
      };
    case REDUX_STATE.department.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter((d) => d.id !== payload.id),
      };
    case REDUX_STATE.department.RESET_DEPARTMENT:
      return {
        ...state,
        department: initialState.department,
      };
    case REDUX_STATE.department.EMPTY_VALUE:
      return {
        ...state,
        department: initialState.department,
      };
    case REDUX_STATE.department.EMPTY_LIST:
      return {
        ...state,
        departments: {},
      };
    case REDUX_STATE.department.COUNT_DEPARTMENTS:
      return { ...state, total: payload };
    default:
      return state;
  }
};

export default departmentReducer;
