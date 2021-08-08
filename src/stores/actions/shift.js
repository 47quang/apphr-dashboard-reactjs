import { ROUTE_PATH } from 'src/constants/key';
import { deCodeChecked } from 'src/pages/setting/shift/shiftFunctionUtil';
import { formatDateTimeToString, parseLocalTime } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis';
import { REDUX_STATE } from '../states';

export const fetchShifts = (params, setLoading) => {
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
        handleExceptions(err, dispatch, getState, 'fetchShifts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};
const formatDownloadedData = (payload) => {
  // payload.name = payload.code + ' - ' + payload.name;
  payload.operateLoop = deCodeChecked(payload.operateLoop);
  payload.startCC = parseLocalTime(payload.startCC);
  payload.endCC = parseLocalTime(payload.endCC);
  payload.createdAt = formatDateTimeToString(payload.createdAt);
  return payload;
};

export const fetchShift = (id, setLoading) => {
  return (dispatch, getState) => {
    api.shift
      .get(id)
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.shift.SET_SHIFT, payload: payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchShift');
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
        handleExceptions(err, dispatch, getState, 'createNewShift');
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
        handleExceptions(err, dispatch, getState, 'updateShift');
      });
  };
};

export const deleteShift = (params, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.shift
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteShift');
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
