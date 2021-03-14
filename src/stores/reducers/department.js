import { REDUX_STATE } from '../states';

const initialState = {
  departments: [],
  department: {
    id: 0,
    name: '',
    shortname: '',
    branchId: 0,
    note: '',
  },
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
        department: {
          id: 0,
          name: '',
          shortname: '',
          branchId: 0,
          note: '',
        },
      };
    default:
      return state;
  }
};

export default departmentReducer;
