import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const convertTime = (payload) => {
  // payload.startDate = payload.startDate.replace('Z', '');
  // payload.endDate = payload.endDate.replace('Z', '');
  return payload;
};
export const fetchProfiles = () => {
  return (dispatch, getState) => {
    api.profile
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchProfile = (id) => {
  return (dispatch, getState) => {
    api.profile
      .get(id)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createProfile = (params, history) => {
  return (dispatch, getState) => {
    api.profile
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        history.push(`/setting/profile/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateProfile = (data) => {
  return (dispatch, getState) => {
    api.profile
      .put(data)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch, getState) => {
    api.profile
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.DELETE_PROFILE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyProfile = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_VALUE,
    payload: [],
  };
};

export const fetchRoles = (params) => {
  return (dispatch, getState) => {
    api.profile
      .getAllRole(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.GET_ROLES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const setTabName = (params) => {
  return {
    type: REDUX_STATE.profile.SET_TAB_NAME,
    payload: params,
  };
};

export const setSubTabName = (params) => {
  return {
    type: REDUX_STATE.profile.SET_SUB_TAB_NAME,
    payload: params,
  };
};
