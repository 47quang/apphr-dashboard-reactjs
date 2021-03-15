import { REDUX_STATE } from '../states';

const initialState = {
  branches: [],
  branch: {
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

const branchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.branch.SET_BRANCHES:
      return { ...state, branches: payload };
    case REDUX_STATE.branch.SET_BRANCH:
      return { ...state, branch: Object.assign({}, state.branch, payload) };
    case REDUX_STATE.branch.DELETE_BRANCH:
      return {
        ...state,
        branches: state.branches.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.branch.EMPTY_VALUE:
      return {
        ...state,
        branch: initialState.branch,
      };
    default:
      return state;
  }
};

export default branchReducer;
