import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchWages = (params, setLoading) => {
  return (dispatch, getState) => {
    api.wage
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((wage) => {
                wage.createdAt = formatDateTimeToString(wage.createdAt);
                return wage;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.wage.SET_WAGES, payload: payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchWages');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWage = (id, setLoading) => {
  return (dispatch, getState) => {
    api.wage
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchWage');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleExceptions(err, dispatch, getState, 'createWage');
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
        handleExceptions(err, dispatch, getState, 'updateWage');
      });
  };
};

export const deleteWage = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.wage
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteWage');
      });
  };
};

export const setEmptyWage = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_VALUE,
    payload: [],
  };
};

export const setEmptyWages = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_LIST,
    payload: [],
  };
};
