import { RESPONSE_CODE, ROUTE_PATH, SERVER_RESPONSE_MESSAGE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';

const handleAccountExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        let messageFromServer = err.response.data.message;
        if (messageFromServer === SERVER_RESPONSE_MESSAGE.VALIDATE_FAILED_EMAIL) errorMessage = 'Không tìm thấy email này';
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
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchAccounts = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.account
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.role = a.role.name;
                a.profileCode = a.profile.code;
                a.profileId = a.profile.id;
                a.employee = a.profile.code + ' - ' + a.profile.fullname;
                a.createdAt = formatDateTimeToString(a.createdAt);
                return a;
              })
            : [];
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNTS, payload });
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'fetch Accounts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const filterAccounts = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.account
      .filter(params)
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
        handleAccountExceptions(err, dispatch, 'filterAccounts');
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
        payload.profileId = payload.profileId ?? undefined;
        payload.profileName = payload.profileId ? payload.profile.code + ' - ' + payload.profile.fullname : '';
        let roles = await api.role.getAll().then(({ payload }) => {
          dispatch({ type: REDUX_STATE.account.GET_ROLES, payload });
          return payload;
        });
        let thisRole = roles.filter((r) => r.id === payload.roleId);
        payload.permissionIds = thisRole.length > 0 ? thisRole[0].permissionIds : [];
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
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.ACCOUNT + `/${payload.id}`);
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'create Account');
      });
  };
};

export const updateAccount = (data, success_msg) => {
  return (dispatch, getState) => {
    api.account
      .put(data)
      .then(({ payload }) => {
        payload.profileName = data.profileName;
        payload.permissionIds = data.permissionIds;
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'update Account');
      });
  };
};

export const deleteAccount = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.account
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'delete Accounts');
      });
  };
};
export const resetPassword = (id, success_msg) => {
  return (dispatch, getState) => {
    api.account
      .resetPassword(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'resetPassword');
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

export const fetchProfiles = (params) => {
  return (dispatch, getState) => {
    api.profile
      .getProfiles(params)
      .then(({ payload }) => {
        payload =
          payload && payload.length > 0 ? payload.map((profile) => ({ id: profile.id ?? 0, name: profile.code + ' - ' + profile.fullname })) : [];
        dispatch({ type: REDUX_STATE.account.GET_PROFILES, payload });
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'fetch profiles');
      });
  };
};

export const fetchProfilesWithoutAccount = (params) => {
  return (dispatch, getState) => {
    api.profile
      .getProfilesWithoutAccount()
      .then(({ payload }) => {
        payload =
          payload && payload.length > 0 ? payload.map((profile) => ({ id: profile.id ?? 0, name: profile?.code + ' - ' + profile.fullname })) : [];
        dispatch({ type: REDUX_STATE.account.GET_PROFILES, payload });
      })
      .catch((err) => {
        handleAccountExceptions(err, dispatch, 'fetch profiles');
      });
  };
};

export const countAccounts = (params) => {
  return (dispatch, getState) => {
    api.account
      .count(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.COUNT_ACCOUNT, payload });
      })
      .catch((err) => {
        console.log(err);
        handleAccountExceptions(err, dispatch, 'count accounts');
      });
  };
};
