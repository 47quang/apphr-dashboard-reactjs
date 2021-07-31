import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchPayments = (params, setLoading, t) => {
  return (dispatch, getState) => {
    api.payment
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((f) => {
                f.createdAt = formatDateTimeToString(f.createdAt);
                return f;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPayments');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchPayment = (id, setLoading) => {
  return (dispatch, getState) => {
    api.payment
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.payment.SET_PAYMENT, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPayment');
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
        handleExceptions(err, dispatch, getState, 'createPayment');
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
        handleExceptions(err, dispatch, getState, 'updatePayment');
      });
  };
};

export const deletePayment = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.payment
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deletePayment');
      });
  };
};

export const setEmptyPayment = () => {
  return {
    type: REDUX_STATE.payment.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyPayments = () => {
  return {
    type: REDUX_STATE.payment.EMPTY_LIST,
    payload: [],
  };
};
