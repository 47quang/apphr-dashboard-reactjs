import { ROUTE_PATH } from 'src/constants/key';
import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchProfiles = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.profile
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((profile) => {
                profile.gender = profile.gender === 'male' ? 'Nam' : 'Nữ';
                return profile;
              })
            : [];
        dispatch({ type: REDUX_STATE.profile.SET_PROFILES, payload });
        if (onTotalChange) onTotalChange(total);
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
        payload.dateOfBirth = formatDateInput(payload.dateOfBirth);
        payload.cmndIssuedDate = formatDateInput(payload.cmndIssuedDate);
        payload.passportIssuedDate = formatDateInput(payload.passportIssuedDate);
        payload.passportExpiredDate = formatDateInput(payload.passportExpiredDate);
        payload['have_id'] = payload.cmnd ? true : false;
        payload['have_passport'] = payload.passport ? true : false;

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
  if (!params.have_id) {
    params.cmnd = null;
    params.cmndIssuedDate = null;
    params.cmndProvinceId = null;
  }
  if (!params.have_passport) {
    params.passport = null;
    params.passportIssuedDate = null;
    params.passportExpiredDate = null;
    params.passportProvinceId = null;
  }
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
  // data.departmentId = data.departmentId !== null && parseInt(data.departmentId) !== 0 ? parseInt(data.departmentId) : null;
  // data.positionId = data.positionId !== null && parseInt(data.positionId) !== 0 ? parseInt(data.positionId) : null;
  if (!data.have_id) {
    data.cmnd = null;
    data.cmndIssuedDate = null;
    data.cmndProvinceId = null;
  }
  if (!data.have_passport) {
    data.passport = null;
    data.passportIssuedDate = null;
    data.passportExpiredDate = null;
    data.passportProvinceId = null;
  }

  return (dispatch, getState) => {
    api.profile
      .put(data)
      .then(({ payload }) => {
        payload.dateOfBirth = formatDateInput(payload.dateOfBirth);
        payload.cmndIssuedDate = formatDateInput(payload.cmndIssuedDate);
        payload.passportIssuedDate = formatDateInput(payload.passportIssuedDate);

        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePermanentAddress = (data, provinces, districts, wards, success_msg) => {
  const getName = (arr, id) => {
    if (arr.length === 0) return null;
    if (!id) return null;
    if (id === '0') return null;
    const lst = arr.filter((val) => val.id === parseInt(id));
    return lst[0].name;
  };
  const getLocationId = (id) => (id === '0' ? null : parseInt(id));

  const params = {
    id: data.id,
    permanentAddress: data.permanentAddress,
    homeTown: data.homeTown,
    temporaryAddress: data.temporaryAddress,
    provinceId: data.provinceId ? getLocationId(data.provinceId) : null,
    provinceName: getName(provinces, data.provinceId),
    wardName: getName(wards, data.wardId),
    districtName: getName(districts, data.districtId),
    wardId: data.wardId ? getLocationId(data.wardId) : null,
    districtId: data.districtId ? getLocationId(data.districtId) : null,
  };
  return (dispatch, getState) => {
    api.profile
      .put(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const updateRelationship = (data, profileId, success_msg) => {
  const params = {
    id: profileId,
    relationship: {
      ...data,
    },
  };
  return (dispatch, getState) => {
    api.profile
      .put(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteProfile = (id, success_msg) => {
  return (dispatch, getState) => {
    api.profile
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.DELETE_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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

export const fetchContacts = (profileId) => {
  const params = {
    profileId: parseInt(profileId),
  };
  return (dispatch, getState) => {
    api.contact
      .getAll(params)
      .then(({ payload }) => {
        payload.sort((first, second) => (first.id < second.id ? -1 : first.id > second.id ? 1 : 0));
        dispatch({ type: REDUX_STATE.profile.SET_CONTACTS, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const createNewContact = (data, profileId, success_msg, ref) => {
  const params = {
    ...data,
    profileId: parseInt(profileId),
  };
  return (dispatch, getState) => {
    api.contact
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.CREATE_NEW_CONTACTS, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        ref.current.handleReset();
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const updateContact = (data, profileId, success_msg) => {
  return (dispatch, getState) => {
    api.contact
      .put(data)
      .then(({ payload }) => {
        dispatch(fetchContacts(profileId));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteContact = (contactId, profileId, setClosePopOver, success_msg) => {
  return (dispatch, getState) => {
    api.contact
      .delete(contactId)
      .then(({ payload }) => {
        dispatch(fetchContacts(parseInt(profileId)));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      })
      .finally(() => {
        setClosePopOver();
      });
  };
};

export const updateOtherInfo = (profile, success_msg) => {
  const params = {
    id: parseInt(profile.id),
    taxCode: profile.taxCode,
    nationality: profile.nationality,
    religion: profile.religion,
    note: profile.note,
  };
  return (dispatch, getState) => {
    api.profile
      .put(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};
