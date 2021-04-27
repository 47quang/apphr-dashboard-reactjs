import { deleteTheLastZ, formatDate, formatTime, getDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchLeaveRequests = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                if (req.type === 'pay') req.type = 'Nghỉ có trả lương';
                else if (req.type === 'no-pay') req.type = 'Nghỉ không trả lương';
                else req.type = 'Nghỉ theo chế độ';
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.leaveReq.SET_LEAVE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchLeaveRequest = (id) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = deleteTheLastZ(payload.createdAt);
        payload.handleAt = payload.handleAt ? deleteTheLastZ(payload.handleAt) : '';
        payload.fullname = payload.profile.fullname;
        payload.assignments =
          payload.assignments && payload.assignments.length > 0
            ? payload.assignments.map((ass) => {
                ass.name = formatTime(ass.shift.startCC) + ' - ' + formatTime(ass.shift.endCC) + ' - ' + formatDate(getDateInput(ass.date));
                return ass;
              })
            : [];
        dispatch({ type: REDUX_STATE.leaveReq.SET_LEAVE_REQUEST, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const approveLeaveRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .approve(id)
      .then(({ payload }) => {
        payload.fullname = payload.profile.fullname;
        dispatch(fetchLeaveRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rejectLeaveRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .reject(id)
      .then(({ payload }) => {
        dispatch(fetchLeaveRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchRemoteRequests = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;

                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.remoteReq.SET_REMOTE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchRemoteRequest = (id) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = deleteTheLastZ(payload.createdAt);
        payload.handleAt = payload.handleAt ? deleteTheLastZ(payload.handleAt) : '';
        payload.assignments =
          payload.assignments && payload.assignments.length > 0
            ? payload.assignments.map((ass) => {
                ass.name = formatTime(ass.shift.startCC) + ' - ' + formatTime(ass.shift.endCC) + ' - ' + formatDate(getDateInput(ass.date));
                return ass;
              })
            : [];
        dispatch({ type: REDUX_STATE.remoteReq.SET_REMOTE_REQUEST, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const approveRemoteRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .approve(id)
      .then(({ payload }) => {
        dispatch(fetchRemoteRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rejectRemoteRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .reject(id)
      .then(({ payload }) => {
        dispatch(fetchRemoteRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchOvertimeRequests = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.overtimeReq.SET_OVERTIME_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchOvertimeRequest = (id) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = deleteTheLastZ(payload.createdAt);
        payload.handleAt = payload.handleAt ? deleteTheLastZ(payload.handleAt) : '';
        payload.assignment =
          formatTime(payload.shift.startCC) + ' - ' + formatTime(payload.shift.endCC) + ' - ' + formatDate(getDateInput(payload.date));
        dispatch({ type: REDUX_STATE.overtimeReq.SET_OVERTIME_REQUEST, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const approveOvertimeRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .approve(id)
      .then(({ payload }) => {
        dispatch(fetchOvertimeRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const rejectOvertimeRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .reject(id)
      .then(({ payload }) => {
        dispatch(fetchOvertimeRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyWage = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_VALUE,
    payload: [],
  };
};
