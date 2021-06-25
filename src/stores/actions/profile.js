import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateInput, formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleProfileExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
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
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchProfiles = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.profile
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((profile) => {
                profile.createdAt = formatDateTimeToString(profile.createdAt);
                return profile;
              })
            : [];
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.profile.SET_PROFILES, payload });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'fetchProfiles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchProfile = (id, setLoading) => {
  if (setLoading) setLoading(true);
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
        handleProfileExceptions(err, dispatch, 'fetchProfile');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleProfileExceptions(err, dispatch, 'createProfile');
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
        handleProfileExceptions(err, dispatch, 'updateProfile');
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
        handleProfileExceptions(err, dispatch, 'updatePermanentAddress');
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
        handleProfileExceptions(err, dispatch, 'updateRelationship');
      });
  };
};

export const deleteProfile = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.profile
      .delete(id)
      .then(() => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'deleteProfile');
      });
  };
};

export const setEmptyProfile = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyProfiles = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_LIST,
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
        handleProfileExceptions(err, dispatch, 'fetchRoles');
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
        handleProfileExceptions(err, dispatch, 'fetchContacts');
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
        handleProfileExceptions(err, dispatch, 'createNewContact');
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
        handleProfileExceptions(err, dispatch, 'updateContact');
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
        handleProfileExceptions(err, dispatch, 'deleteContact');
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
        handleProfileExceptions(err, dispatch, 'updateOtherInfo');
      });
  };
};

export const exportWage = (params, success_msg) => {
  return (dispatch, getState) => {
    api.profile
      .exportSalary(params)
      .then(({ payload }) => {
        window.location.href = payload.publicPath;
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'exportWage');
      });
  };
};
export const exportAllWage = (params, success_msg) => {
  return (dispatch, getState) => {
    api.profile
      .exportAllSalary(params)
      .then(({ payload }) => {
        window.location.href = payload.publicPath;
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'exportWage');
      });
  };
};
const type = {
  limitation: 'Có xác định thời hạn',
  un_limitation: 'Không xác định thời hạn',
  season: 'Thuê khoán',
};
export const fetchActiveContract = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.profile
      .getActiveContract(id)
      .then(async ({ payload }) => {
        if (payload) {
          payload.text_type = type[payload.type];
          payload.handleDate = formatDateInput(payload.handleDate);
          payload.expiredDate = formatDateInput(payload.expiredDate);
          payload.validDate = formatDateInput(payload.validDate);
          payload.startWork = formatDateInput(payload.startWork);
          payload['formOfPayment'] = payload?.wage?.type;
          payload['wageId'] = payload?.wage?.id;
          payload['amount'] = payload?.wage?.amount;
          payload['standardHours'] = payload.standardHours ?? undefined;
          payload['wages'] = await api.wage.getAll({ type: payload?.wage?.type }).then(({ payload }) => payload);
        }
        if (setLoading) setLoading(false);
        dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_CONTRACT, payload });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'fetchActiveContract');
      });
  };
};

export const setEmptyActiveContract = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_ACTIVE_CONTRACT,
    payload: [],
  };
};

export const fetchActiveWage = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.profile
      .getActiveWage(id)
      .then(async ({ payload }) => {
        if (payload) {
          payload.wageId = payload.wageId ?? undefined;
          payload.type = payload?.wage?.type;
          payload.wages = payload.wageId ? await api.wage.getAll({ type: payload.type }).then(({ payload }) => payload) : [];
          payload.startDate = formatDateInput(payload.startDate);
          payload.expiredDate = payload.expiredDate ? formatDateInput(payload.expiredDate) : '';
        }
        if (setLoading) setLoading(false);
        dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_WAGE, payload });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'fetchActiveWage');
      });
  };
};
export const fetchActiveWorking = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.profile
      .getActiveWorking(id)
      .then(({ payload }) => {
        if (payload) {
        }
        if (setLoading) setLoading(false);
        dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_WAGE, payload });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'fetchActiveWage');
      });
  };
};
export const createActiveWage = (params, success_msg, handleResetNewWage) => {
  delete params.id;
  delete params.wage;
  delete params.wages;
  if (params.expiredDate === '') delete params.expiredDate;
  params.allowanceIds = params && params.allowances && params.allowances.length > 0 ? params.allowances.map((a) => parseInt(a.id)) : [];
  return (dispatch, getState) => {
    api.wageHistory
      .post(params)
      .then(async ({ payload }) => {
        if (payload) {
          payload.wageId = payload.wageId ?? undefined;
          payload.type = payload?.wage?.type;
          payload.wages = payload.wageId ? await api.wage.getAll({ type: payload.type }).then(({ payload }) => payload) : [];
          payload.startDate = formatDateInput(payload.startDate);
          payload.expiredDate = payload.expiredDate ? formatDateInput(payload.expiredDate) : '';
        }
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleResetNewWage) handleResetNewWage();
        dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_WAGE, payload });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'fetchActiveWage');
      });
  };
};

export const updateWageHistory = (data, success_msg) => {
  if (data.expiredDate === '') delete data.expiredDate;
  data.allowanceIds = data && data.allowances.length > 0 ? data.allowances.map((a) => parseInt(a.id)) : [];
  let thisWage = data.wages && data.wages.length > 0 ? data.wages.filter((wage) => wage.id === data.wageId) : [];
  data.wage = thisWage && thisWage.length > 0 ? thisWage[0] : {};
  return (dispatch, getState) => {
    api.wageHistory
      .put(data)
      .then(({ payload }) => {
        payload.type = data?.wage?.type;
        payload.wageId = data.wageId;
        payload.wages = data.wages;
        payload.allowances = data.allowances;
        payload.startDate = formatDateInput(payload.startDate);
        payload.code = payload.code ?? undefined;
        payload.expiredDate = payload.expiredDate ? formatDateInput(payload.expiredDate) : '';
        if (payload.status === 'active') dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'updateWageHistory');
      });
  };
};

export const setEmptyActiveWage = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_ACTIVE_WAGE,
    payload: [],
  };
};

export const setEmptyActiveWorking = () => {
  return {
    type: REDUX_STATE.profile.EMPTY_ACTIVE_WORKING,
    payload: [],
  };
};
export const exportProfiles = (data) => {
  return (dispatch, getState) => {
    api.profile
      .export(data)
      .then(({ payload }) => {
        window.location.href = payload.publicPath;
      })
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'updateWageHistory');
      });
  };
};
export const importProfiles = (data) => {
  return (dispatch, getState) => {
    api.profile
      .import(data)
      .then(({ payload }) => {})
      .catch((err) => {
        handleProfileExceptions(err, dispatch, 'updateWageHistory');
      });
  };
};
