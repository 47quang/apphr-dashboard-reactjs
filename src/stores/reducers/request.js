import { REDUX_STATE } from '../states';

const initialState = {
  leaveRequests: [],
  leaveForm: {},
  remoteRequests: [],
  remoteForm: {},
  overtimeRequests: [],
  overtimeForm: {},
};

const requestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.leaveReq.SET_LEAVE_REQUESTS:
      return { ...state, leaveRequests: payload };
    case REDUX_STATE.remoteReq.SET_REMOTE_REQUESTS:
      return { ...state, remoteRequests: payload };
    case REDUX_STATE.overtimeReq.SET_OVERTIME_REQUESTS:
      return { ...state, overtimeRequests: payload };
    case REDUX_STATE.leaveReq.DELETE_REQUEST:
      return {
        ...state,
        leaveForm: state.leaveRequests.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.leaveReq.EMPTY_VALUE:
      return {
        ...state,
        leaveForm: initialState.leaveForm,
      };
    default:
      return state;
  }
};

export default requestReducer;
