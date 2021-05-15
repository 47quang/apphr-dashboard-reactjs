import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchPayments = (params, onTotalChange, setLoading) => {
  // const paymentType = {
  //  gross: 'Lương Gross',
  //  insurance: 'Lương bảo hiểm',
  // };
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.payment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((f) => {
                f.type = f.type === 'value' ? 'Khoản tiền mặt' : f.value + ' % ' + (f.by === 'gross' ? 'Tổng thu nhập' : 'Lương bảo hiểm');
                return f;
              })
            : [];
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchPayment = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.payment
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENT, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createPayment = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.payment
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.TAX_DETAIL + `/${payload.id}`);
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

export const updatePayment = (data, success_msg) => {
  return (dispatch, getState) => {
    api.payment
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENT, payload });
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

export const deletePayment = (id, success_msg) => {
  return (dispatch, getState) => {
    api.payment
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.payment.DELETE_PAYMENT, payload });
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

export const setEmptyPayment = () => {
  return {
    type: REDUX_STATE.payment.EMPTY_VALUE,
    payload: [],
  };
};
