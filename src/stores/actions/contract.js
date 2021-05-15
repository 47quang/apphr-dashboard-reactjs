import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchContracts = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.contract
      .getAll(params)
      .then(async ({ payload }) => {
        payload =
          payload && payload.length > 0
            ? payload.map(async (contract) => {
                contract.handleDate = formatDateInput(contract.handleDate);
                contract.expiredDate = formatDateInput(contract.expiredDate);
                contract.validDate = formatDateInput(contract.validDate);
                contract.startWork = formatDateInput(contract.startWork);
                contract['formOfPayment'] = contract?.wage?.type;
                contract['wageId'] = contract?.wage?.id;
                contract['amount'] = contract?.wage?.amount;
                contract['standardHours'] = contract.standardHours ?? undefined;
                contract['wages'] = await api.wage.getAll({ type: contract?.wage?.type }).then(({ payload }) => payload);
                contract['attributes'] =
                  contract.contractAttributes && contract.contractAttributes.length > 0
                    ? contract.contractAttributes.map((attr) => {
                        let rv = {};
                        rv.value = attr.value;
                        rv.name = attr.attribute.name;
                        rv.type = attr.attribute.type;
                        rv.id = attr.attribute.id;
                        return rv;
                      })
                    : [];
                return contract;
              })
            : [];
        payload = await Promise.all(payload);
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
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
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWageHistories = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.contract
      .getAll(params)
      .then(async ({ payload }) => {
        payload =
          payload && payload.length > 0
            ? payload.map(async (contract) => {
                contract.handleDate = formatDateInput(contract.handleDate);
                contract.expiredDate = formatDateInput(contract.expiredDate);
                contract.validDate = formatDateInput(contract.validDate);
                contract.startWork = formatDateInput(contract.startWork);
                contract['paymentType'] = contract?.wage?.type;
                contract['wageId'] = contract?.wage?.id;
                contract['amount'] = contract?.wage?.amount;
                contract['wageHistories'] =
                  contract.wageHistories && contract.wageHistories.length > 0
                    ? contract.wageHistories.map(async (wage) => {
                        console.log('Bug', wage);
                        wage.type = wage?.wage?.type;
                        wage.amount = wage.wage.amount;
                        wage.startDate = formatDateInput(wage.startDate);
                        wage.expiredDate = formatDateInput(wage.expiredDate);
                        wage.wages = await api.wage.getAll({ type: wage?.wage?.type }).then(({ payload }) => payload);
                        return wage;
                      })
                    : [];
                contract['wageHistories'] = await Promise.all(contract['wageHistories']);
                return contract;
              })
            : [];
        payload = await Promise.all(payload);

        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
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
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchContract = (id) => {
  return (dispatch, getState) => {
    api.contract
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.profile.SET_PROFILE, payload });
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

export const createContract = (params, success_msg, handleResetNewContract) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  //params.departmentId = params.departmentId !== null && parseInt(params.departmentId) !== 0 ? parseInt(params.departmentId) : null;
  //params.positionId = params.positionId !== null && parseInt(params.positionId) !== 0 ? parseInt(params.positionId) : null;

  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : undefined;

  params.allowanceIds =
    params.allowances && params.allowances.length > 0
      ? params.allowances.map((allowance) => {
          //if (allowance.name !== 0) return +allowance.name;
          return +allowance.id;
        })
      : [];
  return (dispatch, getState) => {
    api.contract
      .post(params)
      .then(async ({ payload }) => {
        payload.handleDate = formatDateInput(payload.handleDate);
        payload.expiredDate = formatDateInput(payload.expiredDate);
        payload.validDate = formatDateInput(payload.validDate);
        payload.startWork = formatDateInput(payload.startWork);
        payload['paymentType'] = payload?.wage?.type;
        payload['wageId'] = payload?.wage?.id;
        payload['amount'] = payload?.wage?.amount;
        payload['wages'] = await api.wage.getAll({ type: payload?.wage?.type }).then(({ payload }) => payload);
        payload['attributes'] =
          payload.contractAttributes && payload.contractAttributes.length > 0
            ? payload.contractAttributes.map((attr) => {
                let rv = {};
                rv.value = attr.value;
                rv.name = attr.attribute.name;
                rv.type = attr.attribute.type;
                rv.id = attr.attribute.id;
                return rv;
              })
            : [];
        dispatch({ type: REDUX_STATE.contract.CREATE_CONTRACT, payload });
        handleResetNewContract();
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

export const updateContract = (params, success_msg) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  //params.departmentId = params.departmentId !== null && parseInt(params.departmentId) !== 0 ? parseInt(params.departmentId) : null;
  //params.positionId = params.positionId !== null && parseInt(params.positionId) !== 0 ? parseInt(params.positionId) : null;

  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;

  params.allowanceIds =
    params.allowances && params.allowances.length > 0
      ? params.allowances.map((allowance) => {
          //if (allowance.name !== 0) return +allowance.name;
          return +allowance.id;
        })
      : [];
  return (dispatch, getState) => {
    api.contract
      .put(params)
      .then(({ payload }) => {
        payload.isMinimize = true;
        payload.handleDate = formatDateInput(payload.handleDate);
        payload.expiredDate = formatDateInput(payload.expiredDate);
        payload.validDate = formatDateInput(payload.validDate);
        payload.startWork = formatDateInput(payload.startWork);
        payload['paymentType'] = payload?.wage?.type;
        payload['wageId'] = payload?.wage?.id;
        payload['amount'] = payload?.wage?.amount;
        payload['wages'] = params?.wages;
        payload['attributes'] =
          payload.contractAttributes && payload.contractAttributes.length > 0
            ? payload.contractAttributes.map((attr) => {
                let rv = {};
                rv.value = attr.value;
                rv.name = attr.attribute.name;
                rv.type = attr.attribute.type;
                rv.id = attr.attribute.id;
                return rv;
              })
            : [];
        dispatch({ type: REDUX_STATE.contract.UPDATE_CONTRACT, payload });
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

export const deleteContract = (id, success_msg, handleAfterSuccess) => {
  return (dispatch, getState) => {
    api.contract
      .delete(id)
      .then(({ payload }) => {
        handleAfterSuccess();
        dispatch({ type: REDUX_STATE.contract.DELETE_CONTRACT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchBranches = () => {
  return (dispatch, getState) => {
    api.branch
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.GET_BRANCHES, payload });
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

export const fetchWagesByType = (type) => {
  return (dispatch, getState) => {
    api.wage
      .getAll(type)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.GET_WAGES, payload });
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
export const fetchHistoriesWage = (params) => {
  return (dispatch, getState) => {
    api.wageHistory
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.SET_BENEFITS, payload });
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

export const fetchAllowances = () => {
  return (dispatch, getState) => {
    api.allowance
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.GET_ALLOWANCES, payload });
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

export const createWageHistory = (params, success_msg) => {
  params.allowanceIds = params && params.allowances.length > 0 ? params.allowances.map((a) => parseInt(a.id)) : [];
  return (dispatch, getState) => {
    api.wageHistory
      .post(params)
      .then(({ payload }) => {
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
export const setEmptyContracts = () => {
  return {
    type: REDUX_STATE.contract.EMPTY_VALUE,
    payload: [],
  };
};

export const addField = (params, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .putField(params)
      .then(({ payload }) => {
        //dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        // dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
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
export const deleteWageHistory = (id, handleAfterSuccess, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .delete(id)
      .then(({ payload }) => {
        handleAfterSuccess();
        // dispatch({ type: REDUX_STATE.contract.DELETE_CONTRACT, payload });
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
export const activeContract = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .active(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'active');
        // dispatch({ type: REDUX_STATE.contract.DELETE_CONTRACT, payload });
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
export const inactiveContract = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .inactive(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'inactive');
        // dispatch({ type: REDUX_STATE.contract.DELETE_CONTRACT, payload });
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

export const countActiveContracts = () => {
  return (dispatch, getState) => {
    api.contract
      .count()
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.contract.COUNT_ACTIVE_CONTRACT, payload });
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
