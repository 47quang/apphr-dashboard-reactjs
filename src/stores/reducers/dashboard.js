import { REDUX_STATE } from '../states';

const initialState = {
  totalBranch: 0,
  totalDepartment: 0,
  totalLeave: 0,
  totalRemote: 0,
  totalOvertime: 0,
};

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.dashboard.COUNT_BRANCHES:
      return { ...state, totalBranch: payload };
    case REDUX_STATE.dashboard.COUNT_DEPARTMENTS:
      return { ...state, totalDepartment: payload };
    case REDUX_STATE.dashboard.COUNT_LEAVE_REQUESTS:
      return { ...state, totalLeave: payload };
    case REDUX_STATE.dashboard.COUNT_REMOTE_REQUESTS:
      return { ...state, totalRemote: payload };
    case REDUX_STATE.dashboard.COUNT_OVERTIME_REQUESTS:
      return { ...state, totalOvertime: payload };
    default:
      return state;
  }
};

export default dashboardReducer;
