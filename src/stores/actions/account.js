import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

// const convertTime = (payload) => {
//   payload.startDate = payload.startDate.replace('Z', '');
//   payload.endDate = payload.endDate.replace('Z', '');
//   return payload;
// };

const handleAccounts = (payload) => {
  return payload;
};

export const fetchAccounts = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.account
      .getAll(params)
      .then(({ payload, total }) => {
        payload = handleAccounts(payload);
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNTS, payload });
        if (onTotalChange) onTotalChange(total);
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchAccount = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.account
      .get(id)
      .then(async ({ payload }) => {
        payload.email = payload.email ?? '';
        payload.phone = payload.phone ?? '';
        payload.profileId = payload.profileId ?? 0;
        payload.permissionIds = await api.role.get(payload.roleId).then(({ payload }) => payload.permissionIds);
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const createAccount = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.account
      .post(params)
      .then(async ({ payload }) => {
        payload.profileId = payload.profileId ?? 0;
        payload.resetCode = payload.resetCode ?? '';
        payload.rollUp = payload.rollUp ?? '';
        payload.permissionIds = await api.role.get(payload.roleId).then(({ payload }) => payload.permissionIds);
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.ACCOUNT + `/${payload.id}`);
      })
      .catch((err) => {
        console.log('err', err);
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const updateAccount = (data, success_msg) => {
  console.log(data);
  return (dispatch, getState) => {
    api.account
      .put(data)
      .then(({ payload }) => {
        payload.profileId = payload.profileId ?? 0;
        payload.resetCode = payload.resetCode ?? '';
        payload.rollUp = payload.rollUp ?? '';
        payload.salt = payload.salt ?? '';
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log('err', err);

        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Server Error' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteAccount = (id, success_msg) => {
  return (dispatch, getState) => {
    api.account
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.DELETE_ACCOUNT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const setEmptyAccount = () => {
  return {
    type: REDUX_STATE.account.EMPTY_VALUE,
    payload: [],
  };
};

export const fetchRoles = (params) => {
  return (dispatch, getState) => {
    api.account
      .getAllRole(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.GET_ROLES, payload });
      })
      .catch((err) => {
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchRole = (id) => {
  return (dispatch, getState) => {
    api.role
      .get(id)
      .then(({ payload }) => {
        payload.permissionIds = payload.permissionIds.map((val) => +val);
        dispatch({ type: REDUX_STATE.account.GET_PERMISSION_ARRAY, payload });
      })
      .catch((err) => {
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchPermissionGroups = () => {
  return (dispatch, getState) => {
    api.role
      .getAllPermission()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.GET_ALL_PERMISSION, payload });
      })
      .catch((err) => {
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchProfiles = (params) => {
  return (dispatch, getState) => {
    api.profile
      .getProfiles(params)
      .then(({ payload }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((profile) => ({ id: profile.id ?? 0, name: (profile.shortname ?? 'NV001') + ' - ' + profile.fullname }))
            : [];
        dispatch({ type: REDUX_STATE.account.GET_PROFILES, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};
