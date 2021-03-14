import { REDUX_STATE } from '../states';

const initialState = {
  departments: [],
  department: {
    id: 0,
    name: '',
    shortname: '',
    address: '',
    provinceId: 0,
    districtId: 0,
    wardId: 0,
    phone: '',
    note: '',
  },
};

const departmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.department.SET_DEPARTMENTS:
      return { ...state, departments: payload };
    case REDUX_STATE.department.SET_DEPARTMENT:
      return { ...state, department: Object.assign({}, state.department, payload) };
    default:
      return state;
  }
};

export default departmentReducer;
