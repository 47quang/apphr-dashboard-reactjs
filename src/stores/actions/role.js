import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const formatDownloadedData = (payload) => {
  return payload.reduce((init, tup) => {
    tup.createdAt = formatDateTimeToString(tup.createdAt);
    if (tup?.id !== 1) init.push(tup);
    return init;
  }, []);
};

export const fetchRoles = (params, setLoading) => {
  return (dispatch, getState) => {
    api.role
      .getAll(params)
      .then(({ payload, total }) => {
        payload = formatDownloadedData(payload);
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.role.SET_ROLES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchRoles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchRole = (id, setLoading) => {
  return (dispatch, getState) => {
    api.role
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchRole');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createRole = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.role
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });

        history.push(ROUTE_PATH.ROLE + `/${payload.id}`);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createRole');
      });
  };
};

export const updateRole = (data, success_msg) => {
  return (dispatch, getState) => {
    api.role
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'updateRole');
      });
  };
};

export const deleteRole = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.role
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteRole');
      });
  };
};

export const setEmptyRole = () => {
  return {
    type: REDUX_STATE.role.EMPTY_VALUE,
    payload: [],
  };
};

export const fetchPermissions = () => {
  return (dispatch, getState) => {
    api.role
      .getAllPermission()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_PERMISSIONS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchPermissions');
      });
  };
};
