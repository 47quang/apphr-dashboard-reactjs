import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { deCodeChecked } from 'src/pages/setting/shift/shiftFunctionUtil';
import { parseLocalTime } from 'src/utils/datetimeUtils';
import { api } from '../apis';
import { REDUX_STATE } from '../states';
const handleShiftExceptions = (err, dispatch, functionName) => {
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

export const fetchShifts = (params, onTotalChange, setLoading) => {
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
        dispatch({ type: REDUX_STATE.shift.GET_SHIFTS, payload: payload });
        if (onTotalChange) onTotalChange(total);
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

export const deleteShift = (params, success_msg) => {
  return (dispatch, getState) => {
    api.shift
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.DELETE_SHIFT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
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

export const resetShifts = () => {
  return {
    type: REDUX_STATE.shift.RESET_SHIFTS,
    payload: [],
  };
};
