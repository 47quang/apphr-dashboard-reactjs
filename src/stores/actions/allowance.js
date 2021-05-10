import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchAllowances = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.allowance
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((allowance) => {
                if (allowance.type === 'no_tax') allowance.type = 'Không tính thuế';
                else if (allowance.type === 'tax') allowance.type = 'Tính thuế';
                else allowance.type = 'Có hạn mức';
                return allowance;
              })
            : [];
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCES, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchAllowance = (id) => {
  return (dispatch, getState) => {
    api.allowance
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const createAllowance = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.ALLOWANCE + `/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const updateAllowance = (data, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteAllowance = (id, decreaseTotal, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .delete(id)
      .then(({ payload }) => {
        if (decreaseTotal) decreaseTotal(-1);
        dispatch({ type: REDUX_STATE.allowance.DELETE_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const setEmptyAllowance = () => {
  return {
    type: REDUX_STATE.allowance.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyAllowances = () => {
  return {
    type: REDUX_STATE.allowance.EMPTY_LIST,
    payload: [],
  };
};
