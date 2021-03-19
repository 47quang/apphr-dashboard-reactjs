import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const convertTime = (payload) => {
  payload.startDate = payload.startDate.replace('Z', '');
  payload.endDate = payload.endDate.replace('Z', '');
  return payload;
};
export const fetchAccounts = () => {
  return (dispatch, getState) => {
    api.account
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNTS, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchAccount = (id) => {
  return (dispatch, getState) => {
    api.account
      .get(id)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createAccount = (params, history) => {
  return (dispatch, getState) => {
    api.account
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
        history.push(`/setting/account/tab1.id=${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateAccount = (data) => {
  return (dispatch, getState) => {
    api.account
      .put(data)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.account.SET_ACCOUNT, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteAccount = (id) => {
  return (dispatch, getState) => {
    api.account
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.DELETE_ACCOUNT, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyAccount = () => {
  return {
    type: REDUX_STATE.account.EMPTY_ACCOUNT_VALUE,
    payload: [],
  };
};

export const setEmptyProfile = () => {
  return {
    type: REDUX_STATE.account.EMPTY_PROFILE_VALUE,
    payload: [],
  };
};

export const fetchAllProfiles = (params) => {
  return (dispatch, getState) => {
    api.account
      .getAllRequest(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.account.GET_PROFILES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log(err);
      });
  };
};
