import { REDUX_STATE } from '../states';

const initialState = {
  positions: [],
  position: {
    name: '',
    shortname: '',
    branchId: 0,
    departmentId: 0,
    academicLevel: '',
    note: '',
    expYear: 0,
  },
};

const styleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.position.GET_POSITION:
      return { ...state, position: payload };
    case REDUX_STATE.position.UPDATE_POSITION:
      return { ...state, position: payload };

    default:
      return state;
  }
};

export default styleReducer;
