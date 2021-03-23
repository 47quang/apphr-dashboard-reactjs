import { ROUTE_PATH } from 'src/constants/key';
import { convertBranchesId, convertTimeWithoutSecond, deCodeChecked } from 'src/pages/setting/shift/shiftFunctionUtil';
import { api } from '../apis';
import { REDUX_STATE } from '../states';

export const fetchShifts = (params) => {
  return (dispatch, getState) => {
    api.shift
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.GET_SHIFTS, payload: payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const formatDownloadedData = (payload) => {
  payload.operateLoop = deCodeChecked(payload.operateLoop);
  payload.startCC = convertTimeWithoutSecond(payload.startCC);
  payload.endCC = convertTimeWithoutSecond(payload.endCC);
  payload.branchIds = convertBranchesId(payload.branchIds);
  return payload;
};
export const fetchShift = (id) => {
  return (dispatch, getState) => {
    api.shift
      .get(id)
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.shift.SET_SHIFT, payload: payload });
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        dispatch({ type: REDUX_STATE.branch.SET_ALERT, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const updateShift = (data, success_msg) => {
  return (dispatch, getState) => {
    api.shift
      .put(data)
      .then(({ payload }) => {
        payload.operateLoop = deCodeChecked(payload.operateLoop);
        dispatch({
          type: REDUX_STATE.shift.SET_SHIFT,
          payload: payload,
        });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.branch.SET_ALERT, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteShift = (params) => {
  return (dispatch, getState) => {
    api.shift
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.shift.DELETE_SHIFT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: 'Xóa thành công' } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.branch.SET_ALERT, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const resetShift = () => {
  return {
    type: REDUX_STATE.shift.EMPTY_VALUE,
    payload: {},
  };
};
