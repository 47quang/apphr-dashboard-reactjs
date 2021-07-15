import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleRoleExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
  let errorMessage = '';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
        break;
      case RESPONSE_CODE.CE_NOT_FOUND:
        errorMessage = err.response.data.message.en;
        break;
      default:
        errorMessage = err.response?.data?.message?.en || errorMessage;
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
const formatDownloadedData = (payload) => {
  return payload?.map((tup) => {
    tup.createdAt = formatDateTimeToString(tup.createdAt);
    return tup;
  });
};

export const fetchRoles = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.role
      .getAll(params)
      .then(({ payload, total }) => {
        payload = formatDownloadedData(payload);
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.role.SET_ROLES, payload });
      })
      .catch((err) => {
        handleRoleExceptions(err, dispatch, 'fetchRoles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchRole = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.role
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
      })
      .catch((err) => {
        handleRoleExceptions(err, dispatch, 'fetchRole');
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
        handleRoleExceptions(err, dispatch, 'createRole');
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
        handleRoleExceptions(err, dispatch, 'updateRole');
      });
  };
};

export const deleteRole = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.role
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.DELETE_ROLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleRoleExceptions(err, dispatch, 'deleteRole');
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
        handleRoleExceptions(err, dispatch, 'fetchPermissions');
      });
  };
};
