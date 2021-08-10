import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchAccounts = (params, setLoading) => {
  return (dispatch, getState) => {
    api.account
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.reduce((accumulator, a) => {
                if (a.id === 1) {
                  total -= 1;
                  return accumulator;
                }
                a.role = a.role.name;
                a.profileCode = a.profile.code;
                a.profileId = a.profile.id;
                a.employee = a.profile.code + ' - ' + a.profile.fullname;
                a.createdAt = formatDateTimeToString(a.createdAt);
                accumulator.push(a);
                return accumulator;
              }, [])
            : [];
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetch Accounts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAccount = (id, setLoading) => {
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
        handleExceptions(err, dispatch, getState, 'fetchAccount');
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
        handleExceptions(err, dispatch, getState, 'createAccount');
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
        handleExceptions(err, dispatch, getState, 'updateAccount');
      });
  };
};

export const deleteAccount = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.account
      .delete(id)
      .then(() => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteAccount');
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
        handleExceptions(err, dispatch, getState, 'resetPassword');
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
        payload = payload.filter((x) => x.id !== 1);
        dispatch({ type: REDUX_STATE.account.GET_ROLES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchRoles');
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
        handleExceptions(err, dispatch, getState, 'fetchRole');
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
            ? payload.reduce((init, profile) => {
                if (profile.id !== 1) init.push({ id: profile.id ?? 0, name: profile.code + ' - ' + profile.fullname });
                return init;
              }, [])
            : [];
        dispatch({ type: REDUX_STATE.account.GET_PROFILES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchProfiles');
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
        handleExceptions(err, dispatch, getState, 'fetchProfilesWithoutAccount');
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
        handleExceptions(err, dispatch, getState, 'countAccounts');
      });
  };
};
