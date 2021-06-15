import { REDUX_STATE } from '../states';

const initialState = {
  leaveRequests: {
    payload: [],
    total: 0,
  },
  leaveForm: {
    id: '',
    type: '',
    status: '',
    note: '',
    assignments: [],
  },
  remoteRequests: {
    payload: [],
    total: 0,
  },
  remoteForm: {
    id: '',
    status: '',
    note: '',
    assignments: [],
  },
  overtimeRequests: {
    payload: [],
    total: 0,
  },
  overtimeForm: {
    id: '',
    type: '',
    status: '',
    note: '',
    assignments: [],
  },
  totalLeave: 0,
  totalRemote: 0,
  totalOvertime: 0,
};

const requestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.leaveReq.SET_LEAVE_REQUESTS:
      return { ...state, leaveRequests: payload };
    case REDUX_STATE.leaveReq.SET_LEAVE_REQUEST:
      return { ...state, leaveForm: payload };
    case REDUX_STATE.remoteReq.SET_REMOTE_REQUESTS:
      return { ...state, remoteRequests: payload };
    case REDUX_STATE.remoteReq.SET_REMOTE_REQUEST:
      return { ...state, remoteForm: payload };
    case REDUX_STATE.overtimeReq.SET_OVERTIME_REQUESTS:
      return { ...state, overtimeRequests: payload };
    case REDUX_STATE.overtimeReq.SET_OVERTIME_REQUEST:
      return { ...state, overtimeForm: payload };
    case REDUX_STATE.leaveReq.DELETE_REQUEST:
      return {
        ...state,
        leaveForm: state.leaveRequests.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.leaveReq.EMPTY_LIST_LEAVE_REQUEST:
      return {
        ...state,
        leaveRequests: [],
      };
    case REDUX_STATE.leaveReq.EMPTY_FORM_LEAVE_REQUEST:
      return {
        ...state,
        leaveForm: initialState.leaveForm,
      };
    case REDUX_STATE.remoteReq.EMPTY_LIST_REMOTE_REQUEST:
      return {
        ...state,
        remoteRequests: [],
      };
    case REDUX_STATE.remoteReq.EMPTY_FORM_REMOTE_REQUEST:
      return {
        ...state,
        remoteForm: initialState.remoteForm,
      };
    case REDUX_STATE.overtimeReq.EMPTY_LIST_OVERTIME_REQUEST:
      return {
        ...state,
        overtimeRequests: [],
      };
    case REDUX_STATE.overtimeReq.EMPTY_FORM_OVERTIME_REQUEST:
      return {
        ...state,
        overtimeForm: initialState.overtimeForm,
      };
    case REDUX_STATE.leaveReq.COUNT_LEAVE_REQUESTS:
      return { ...state, totalLeave: payload };
    case REDUX_STATE.remoteReq.COUNT_REMOTE_REQUESTS:
      return { ...state, totalRemote: payload };
    case REDUX_STATE.overtimeReq.COUNT_OVERTIME_REQUESTS:
      return { ...state, totalOvertime: payload };
    default:
      return state;
  }
};

export default requestReducer;
