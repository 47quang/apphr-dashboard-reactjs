import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis';
import { REDUX_STATE } from '../states';

const handleDashboardExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
        break;
      case RESPONSE_CODE.CE_NOT_FOUND:
        errorMessage = err.response.data.message.en;
        break;
      default:
        errorMessage = err.response?.data?.message?.en || errorMessage;
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
