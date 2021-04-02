import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchAllowances = () => {
  return (dispatch, getState) => {
    api.allowance
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCES, payload });
      })
      .catch((err) => {
        console.log(err);
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
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
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
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteAllowance = (id, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.DELETE_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const setEmptyAllowance = () => {
  return {
    type: REDUX_STATE.allowance.EMPTY_VALUE,
    payload: [],
  };
};
