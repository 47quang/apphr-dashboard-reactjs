import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchAllowances = (params, setLoading) => {
  return (dispatch, getState) => {
    api.allowance
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((allowance) => {
                allowance.createdAt = formatDateTimeToString(allowance.createdAt);
                return allowance;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAllowances');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAllowance = (id, setLoading) => {
  return (dispatch, getState) => {
    api.allowance
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAllowance');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleExceptions(err, dispatch, getState, 'createAllowance');
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
        handleExceptions(err, dispatch, getState, 'updateAllowance');
      });
  };
};

export const deleteAllowance = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.allowance
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteAllowance');
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
