import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const formatDownloadedData = (payload) => {
  return payload?.map((tup) => {
    tup.createdAt.replace('Z', '');
    return tup;
  });
};

export const fetchRoles = () => {
  return (dispatch, getState) => {
    api.role
      .getAll()
      .then(({ payload }) => {
        payload = formatDownloadedData(payload);
        dispatch({ type: REDUX_STATE.role.SET_ROLES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchRole = (id) => {
  return (dispatch, getState) => {
    api.role
      .get(id)
      .then(({ payload }) => {
        payload.permissionIds = payload.permissionIds.map((val) => +val);
        dispatch({ type: REDUX_STATE.role.SET_ROLE, payload });
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
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
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteRole = (id) => {
  return (dispatch, getState) => {
    api.role
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.role.DELETE_ROLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: 'Xóa thành công' } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
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
        console.log(err);
      });
  };
};
