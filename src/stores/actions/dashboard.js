import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis';
import { REDUX_STATE } from '../states';
//TODO
const handleDashboardExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const countBranches = (params) => {
  return (dispatch, getState) => {
    api.branch
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_BRANCHES, payload });
      })
      .catch((err) => {
        handleDashboardExceptions(err, dispatch, 'countBranches');
      });
  };
};

export const countDepartments = (params) => {
  return (dispatch, getState) => {
    api.department
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_DEPARTMENTS, payload });
      })
      .catch((err) => {
        handleDashboardExceptions(err, dispatch, 'countDepartments');
      });
  };
};
export const countLeaveRequests = (params) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_LEAVE_REQUESTS, payload });
      })
      .catch((err) => {
        handleDashboardExceptions(err, dispatch, 'countLeaveRequests');
      });
  };
};

export const countRemoteRequests = (params) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_REMOTE_REQUESTS, payload });
      })
      .catch((err) => {
        handleDashboardExceptions(err, dispatch, 'countRemoteRequests');
      });
  };
};

export const countOvertimeRequests = (params) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_OVERTIME_REQUESTS, payload });
      })
      .catch((err) => {
        handleDashboardExceptions(err, dispatch, 'countOvertimeRequests');
      });
  };
};
