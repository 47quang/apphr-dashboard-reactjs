import { REDUX_STATE } from '../states';

const initialState = {
  positions: { payload: [], total: 0 },
  position: {
    name: '',
    shortname: '',
    branchId: 0,
    departmentId: 0,
    academicLevel: '0',
    note: '',
    expYear: 0,
    code: '',
  },
  deletedPositionId: 0,
};

const positionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.position.GET_POSITION:
      return { ...state, position: Object.assign({}, state.position, payload) };
    case REDUX_STATE.position.GET_POSITIONS:
      return { ...state, positions: payload };
    case REDUX_STATE.position.UPDATE_POSITION:
      return { ...state, position: payload };
    case REDUX_STATE.position.DELETE_POSITION:
      return {
        ...state,
        positions: state.positions.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.position.EMPTY_VALUE:
      return {
        ...state,
        position: initialState.position,
      };
    case REDUX_STATE.position.EMPTY_LIST:
      return {
        ...state,
        positions: initialState.position,
      };
    default:
      return state;
  }
};

export default positionReducer;
