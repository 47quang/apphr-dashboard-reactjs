import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchWages = (params, onTotalChange, setLoading) => {
  const paymentType = {
    by_hour: 'Chi trả theo giờ',
    by_month: 'Chi trả theo tháng',
  };
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload &&
          payload.length > 0 &&
          payload.map((wage) => {
            wage.type = paymentType[wage.type];
            return wage;
          });
        dispatch({ type: REDUX_STATE.wage.SET_WAGES, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWage = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
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

export const createWage = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.WAGE + `/${payload.id}`);
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

export const updateWage = (data, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
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

export const deleteWage = (id, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.DELETE_WAGE, payload });
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

export const setEmptyWage = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_VALUE,
    payload: [],
  };
};
