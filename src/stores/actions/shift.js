import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { deCodeChecked } from 'src/pages/setting/shift/shiftFunctionUtil';
import { formatDateTimeToString, parseLocalTime } from 'src/utils/datetimeUtils';
import { api } from '../apis';
import { REDUX_STATE } from '../states';

const handleShiftExceptions = (err, dispatch, functionName) => {
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
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};

export const fetchShifts = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.shift
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((p) => {
                p = formatDownloadedData(p);

                return p;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.shift.GET_SHIFTS, payload: payload });
      })
      .catch((err) => {
        handleShiftExceptions(err, dispatch, 'fetchShifts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
const formatDownloadedData = (payload) => {
  payload.operateLoop = deCodeChecked(payload.operateLoop);
  payload.startCC = parseLocalTime(payload.startCC);
  payload.endCC = parseLocalTime(payload.endCC);
  payload.createdAt = formatDateTimeToString(payload.createdAt);
  return payload;
};

export const fetchShift = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.shift
      .get(id)
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.shift.SET_SHIFT, payload: payload });
      })
      .catch((err) => {
        handleShiftExceptions(err, dispatch, 'fetchShift');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
export const createNewShift = (data, history, success_msg) => {
  return (dispatch, getState) => {
    api.shift
      .post(data)
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.shift.SET_SHIFT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });

        history.push(ROUTE_PATH.SHIFT + `/${payload.id}`);
      })
      .catch((err) => {
        handleShiftExceptions(err, dispatch, 'createNewShift');
      });
  };
};

export const updateShift = (data, success_msg) => {
  return (dispatch, getState) => {
    api.shift
      .put(data)
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({
          type: REDUX_STATE.shift.SET_SHIFT,
          payload: payload,
        });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleShiftExceptions(err, dispatch, 'updateShift');
      });
  };
};

export const deleteShift = (params, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.shift
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.DELETE_SHIFT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleShiftExceptions(err, dispatch, 'deleteShift');
      });
  };
};

export const resetShift = () => {
  return {
    type: REDUX_STATE.shift.EMPTY_VALUE,
    payload: {},
  };
};

export const setEmptyShifts = () => {
  return {
    type: REDUX_STATE.shift.EMPTY_LIST,
    payload: {},
  };
};

export const resetShifts = () => {
  return {
    type: REDUX_STATE.shift.RESET_SHIFTS,
    payload: [],
  };
};
