import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchPositions = (params, setLoading) => {
  return (dispatch, getState) => {
    api.position
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                a.branchName = a.branch?.name;
                a.departmentName = a.department?.name;
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.position.GET_POSITIONS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPositions');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchPosition = (id, setLoading) => {
  return (dispatch, getState) => {
    api.position
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPosition');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createPosition = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.position
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.POSITION + `/${payload.id}`);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createPosition');
      });
  };
};

export const updatePosition = (data, id, success_msg) => {
  return (dispatch, getState) => {
    api.position
      .put(data, id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'updatePosition');
      });
  };
};

export const deletePosition = (params, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.position
      .delete(params.id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deletePosition');
      });
  };
};

export const setEmptyPosition = () => {
  return {
    type: REDUX_STATE.position.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyPositions = () => {
  return {
    type: REDUX_STATE.position.EMPTY_LIST,
    payload: [],
  };
};
