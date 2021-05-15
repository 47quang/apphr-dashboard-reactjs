import { RESPONSE_CODE, ROUTE_PATH, SERVER_RESPONSE_MESSAGE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleAccountExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        let messageFromServer = err.response.data.message;
        if (messageFromServer === SERVER_RESPONSE_MESSAGE.VALIDATE_FAILED_EMAIL) errorMessage = 'Không tìm thấy email này';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchAccounts = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.account
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.role = a.role.name;
                return a;
              })
            : [];
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'fetch Accounts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'fetch Account');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleAccountExceptions(err, dispatch, 'create Account');
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
        handleAccountExceptions(err, dispatch, 'update Account');
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
        handleAccountExceptions(err, dispatch, 'delete Accounts');
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
        handleAccountExceptions(err, dispatch, 'fetch roles');
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
        handleAccountExceptions(err, dispatch, 'fetch Role');
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
        handleAccountExceptions(err, dispatch, 'fetch permissionGroups');
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
        handleAccountExceptions(err, dispatch, 'fetch profiles');
      });
  };
};
