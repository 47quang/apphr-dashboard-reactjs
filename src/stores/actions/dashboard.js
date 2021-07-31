import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis';
import { REDUX_STATE } from '../states';

export const countBranches = (params) => {
  return (dispatch, getState) => {
    api.branch
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.dashboard.COUNT_BRANCHES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'countBranches');
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
        handleExceptions(err, dispatch, getState, 'countDepartments');
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
        handleExceptions(err, dispatch, getState, 'countLeaveRequests');
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
        handleExceptions(err, dispatch, getState, 'countRemoteRequests');
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
        handleExceptions(err, dispatch, getState, 'countOvertimeRequests');
      });
  };
};
