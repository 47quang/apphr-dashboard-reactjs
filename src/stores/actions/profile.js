import { ROUTE_PATH } from 'src/constants/key';
import { getDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
        payload.dateOfBirth = getDateInput(payload.dateOfBirth);
        payload.cmndIssuedDate = getDateInput(payload.cmndIssuedDate);
        payload.passportIssuedDate = getDateInput(payload.passportIssuedDate);
        payload.passport_end = getDateInput(payload.passport_end);
        payload['have_id'] = payload.cmnd ? true : false;
        payload['have_passport'] = payload.passport ? true : false;
        console.log(payload);
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createProfile = (params, history, success_msg) => {
  params.dateOfBirth = params.dateOfBirth === '' ? null : params.dateOfBirth;
  params.cmnd = params.cmnd === '' ? null : params.cmnd;
  params.cmndIssuedDate = params.cmndIssuedDate === '' ? null : params.cmndIssuedDate;
  params.cmndProvinceId = params.cmndProvinceId !== null && parseInt(params.cmndProvinceId) !== 0 ? parseInt(params.cmndProvinceId) : null;
  params.passport = params.passport === '' ? null : params.passport;
  params.passportIssuedDate = params.passportIssuedDate === '' ? null : params.passportIssuedDate;
  params.passportExpiredDate = params.passportExpiredDate === '' ? null : params.passportExpiredDate;
  params.passportProvinceId =
    params.passportProvinceId !== null && parseInt(params.passportProvinceId) !== 0 ? parseInt(params.passportProvinceId) : null;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  params.departmentId = params.departmentId !== null && parseInt(params.departmentId) !== 0 ? parseInt(params.departmentId) : null;
  params.positionId = params.positionId !== null && parseInt(params.positionId) !== 0 ? parseInt(params.positionId) : null;
  return (dispatch, getState) => {
    api.profile
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        history.push(ROUTE_PATH.PROFILE + `/${payload.id}`);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: err } });
      });
  };
};

export const updateProfile = (data, history, success_msg) => {
  data.dateOfBirth = data.dateOfBirth === '' ? null : data.dateOfBirth;
  data.cmnd = data.cmnd === '' ? null : data.cmnd;
  data.cmndIssuedDate = data.cmndIssuedDate === '' ? null : data.cmndIssuedDate;
  data.cmndProvinceId = data.cmndProvinceId !== null && parseInt(data.cmndProvinceId) !== 0 ? parseInt(data.cmndProvinceId) : null;
  data.passport = data.passport === '' ? null : data.passport;
  data.passportIssuedDate = data.passportIssuedDate === '' ? null : data.passportIssuedDate;
  data.passportExpiredDate = data.passportExpiredDate === '' ? null : data.passportExpiredDate;
  data.passportProvinceId = data.passportProvinceId !== null && parseInt(data.passportProvinceId) !== 0 ? parseInt(data.passportProvinceId) : null;
  data.branchId = data.branchId !== null && parseInt(data.branchId) !== 0 ? parseInt(data.branchId) : null;
  data.departmentId = data.departmentId !== null && parseInt(data.departmentId) !== 0 ? parseInt(data.departmentId) : null;
  data.positionId = data.positionId !== null && parseInt(data.positionId) !== 0 ? parseInt(data.positionId) : null;
  return (dispatch, getState) => {
    api.profile
      .put(data)
      .then(({ payload }) => {
        console.log(payload);
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
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
