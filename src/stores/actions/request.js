import { RESPONSE_CODE, ROUTE_PATH, SERVER_RESPONSE_MESSAGE } from 'src/constants/key';
import { formatDate, formatDateTimeScheduleToString, formatDateTimeToString, parseLocalTime } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleRequestExceptions = (err, dispatch, functionName) => {
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
      case RESPONSE_CODE.CE_BAD_REQUEST:
        let serverErrorMessage = err.response.data.message;
        switch (serverErrorMessage) {
          case SERVER_RESPONSE_MESSAGE.NO_DAYS_OFF:
            errorMessage = 'Không còn ngày nghỉ được hưởng lương nữa';
            break;
          case SERVER_RESPONSE_MESSAGE.INVALID_ASSIGNMENT_STATUS:
            errorMessage = 'Đã có lỗi bất thường xảy ra';
            break;
          case SERVER_RESPONSE_MESSAGE.ALREADY_EXISTED_ASSIGNMENT:
            errorMessage = 'Không thể tạo đề xuất làm ngoài giờ khi đã có đề xuất khác trong thời gian này';
            break;
          default:
            break;
        }

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
export const fetchLeaveRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
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
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.leaveReq.SET_LEAVE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchLeaveRequests');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
export const filterLeaveRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.leaveRequest
      .filter(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                if (req.type === 'pay') req.type = 'Nghỉ có trả lương';
                else if (req.type === 'no-pay') req.type = 'Nghỉ không trả lương';
                else req.type = 'Nghỉ theo chế độ';
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.leaveReq.SET_LEAVE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchLeaveRequest = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.leaveRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = formatDateTimeScheduleToString(payload.createdAt);
        payload.handleDate = payload.approverId ? formatDateTimeScheduleToString(payload.approver.createdAt) : '';
        payload.fullname = payload.profile.fullname;
        payload.handler = payload.approverId ? payload.approver.profile.code + ' - ' + payload.approver.profile.fullname : '';
        payload.assignments =
          payload.assignments && payload.assignments.length > 0
            ? payload.assignments.map((ass) => {
                ass.name = parseLocalTime(ass.shift.startCC) + ' - ' + parseLocalTime(ass.shift.endCC) + ' - ' + formatDate(ass.startTime);
                return ass;
              })
            : [];
        dispatch({ type: REDUX_STATE.leaveReq.SET_LEAVE_REQUEST, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchLeaveRequest');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createLeaveRequest = (data, history, success_msg) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .post(data)
      .then(({ payload }) => {
        history.push(ROUTE_PATH.LEAVE + `/leave.id=${payload.id}`);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'createLeaveRequest');
      });
  };
};

export const approveLeaveRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .approve(id)
      .then(({ payload }) => {
        // payload.fullname = payload.profile.fullname;
        dispatch(fetchLeaveRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'approveLeaveRequest');
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
        handleRequestExceptions(err, dispatch, 'rejectLeaveRequest ');
      });
  };
};

export const fetchRemoteRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.remoteRequest
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.remoteReq.SET_REMOTE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchRemoteRequests');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
export const filterRemoteRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.remoteRequest
      .filter(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.remoteReq.SET_REMOTE_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchRemoteRequest = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.remoteRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = formatDateTimeScheduleToString(payload.createdAt);
        payload.handler = payload.approverId ? payload.approver.profile.code + ' - ' + payload.approver.profile.fullname : '';
        payload.handleDate = payload.approverId ? formatDateTimeScheduleToString(payload.approver.createdAt) : '';
        payload.assignments =
          payload.assignments && payload.assignments.length > 0
            ? payload.assignments.map((ass) => {
                ass.name = parseLocalTime(ass.shift.startCC) + ' - ' + parseLocalTime(ass.shift.endCC) + ' - ' + formatDate(ass.startTime);
                return ass;
              })
            : [];
        dispatch({ type: REDUX_STATE.remoteReq.SET_REMOTE_REQUEST, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchRemoteRequest');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
export const createRemoteRequest = (data, history, success_msg) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .post(data)
      .then(({ payload }) => {
        history.push(ROUTE_PATH.REMOTE + `/remote.id=${payload.id}`);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'createRemoteRequest');
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
        handleRequestExceptions(err, dispatch, 'approveRemoteRequest');
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
        handleRequestExceptions(err, dispatch, 'rejectRemoteRequest');
      });
  };
};

export const fetchOvertimeRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.overtimeRequest
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.overtimeReq.SET_OVERTIME_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchOvertimeRequests');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
export const filterOvertimeRequests = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.overtimeRequest
      .filter(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload?.length > 0
            ? payload.map((req) => {
                req.fullname = req.profile.fullname;
                req.createdAt = formatDateTimeToString(req.createdAt);
                return req;
              })
            : [];
        dispatch({ type: REDUX_STATE.overtimeReq.SET_OVERTIME_REQUESTS, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchOvertimeRequest = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.overtimeRequest
      .get(id)
      .then(({ payload }) => {
        payload.createdAt = formatDateTimeScheduleToString(payload.createdAt);
        payload.handler = payload.approverId ? payload.approver.profile.code + ' - ' + payload.approver.profile.fullname : '';
        payload.handleDate = payload.approverId ? formatDateTimeScheduleToString(payload.approver.createdAt) : '';
        payload.assignment = parseLocalTime(payload.shift.startCC) + ' - ' + parseLocalTime(payload.shift.endCC) + ' - ' + formatDate(payload.date);
        dispatch({ type: REDUX_STATE.overtimeReq.SET_OVERTIME_REQUEST, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'fetchOvertimeRequest');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createOvertimeRequest = (data, history, success_msg) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .post(data)
      .then(({ payload }) => {
        history.push(ROUTE_PATH.OVERTIME + `/overtime.id=${payload.id}`);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'createOvertimeRequest');
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
        handleRequestExceptions(err, dispatch, 'approveOvertimeRequest');
      });
  };
};

export const rejectOvertimeRequest = (id, success_msg) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .reject(id)
      .then(({ payload }) => {
        dispatch(fetchOvertimeRequest(id));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'rejectOvertimeRequest');
      });
  };
};

export const setEmptyLeaveRequests = () => {
  return {
    type: REDUX_STATE.leaveReq.EMPTY_LIST_LEAVE_REQUEST,
    payload: [],
  };
};
export const setEmptyLeaveRequest = () => {
  return {
    type: REDUX_STATE.leaveReq.EMPTY_FORM_LEAVE_REQUEST,
    payload: [],
  };
};
export const setEmptyRemoteRequests = () => {
  return {
    type: REDUX_STATE.remoteReq.EMPTY_LIST_REMOTE_REQUEST,
    payload: [],
  };
};
export const setEmptyRemoteRequest = () => {
  return {
    type: REDUX_STATE.remoteReq.EMPTY_FORM_REMOTE_REQUEST,
    payload: [],
  };
};
export const setEmptyOverTimeRequests = () => {
  return {
    type: REDUX_STATE.overtimeReq.EMPTY_LIST_OVERTIME_REQUEST,
    payload: [],
  };
};
export const setEmptyOverTimeRequest = () => {
  return {
    type: REDUX_STATE.overtimeReq.EMPTY_FORM_OVERTIME_REQUEST,
    payload: [],
  };
};

export const countLeaveRequests = (params) => {
  return (dispatch, getState) => {
    api.leaveRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.leaveReq.COUNT_LEAVE_REQUESTS, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'countLeaveRequests');
      });
  };
};

export const countRemoteRequests = (params) => {
  return (dispatch, getState) => {
    api.remoteRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.remoteReq.COUNT_REMOTE_REQUESTS, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'countRemoteRequests');
      });
  };
};

export const countOvertimeRequests = (params) => {
  return (dispatch, getState) => {
    api.overtimeRequest
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.overtimeReq.COUNT_OVERTIME_REQUESTS, payload });
      })
      .catch((err) => {
        handleRequestExceptions(err, dispatch, 'countOvertimeRequests');
      });
  };
};
