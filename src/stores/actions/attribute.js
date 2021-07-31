import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchAttributes = (params, setLoading) => {
  return (dispatch, getState) => {
    api.attribute
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAttributes');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAttribute = (id, setLoading) => {
  return (dispatch, getState) => {
    api.attribute
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchAttribute');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createAttribute = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.attribute
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.CONTRACT_ATTRIBUTE + `/${payload.id}`);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createAttribute');
      });
  };
};

export const updateAttribute = (data, success_msg) => {
  return (dispatch, getState) => {
    api.attribute
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'updateAttribute');
      });
  };
};

export const deleteAttribute = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.attribute
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteAttribute');
      });
  };
};

export const setEmptyAttribute = () => {
  return {
    type: REDUX_STATE.attribute.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyContractAttributes = () => {
  return {
    type: REDUX_STATE.attribute.EMPTY_LIST,
    payload: [],
  };
};
