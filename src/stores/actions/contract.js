import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateInput, formatDate, formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleContractExceptions = (err, dispatch, functionName) => {
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

const type = {
  limitation: 'Có xác định thời hạn',
  un_limitation: 'Không xác định thời hạn',
  season: 'Thuê khoán',
};
const status = {
  inactive: 'Không có hiệu lực',
  active: 'Có hiệu lực',
};

export const fetchContracts = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.contract
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((contract) => {
                contract.name = contract.code + ' - ' + contract.fullname + ' - ' + status[contract.status];
                contract.text_type = type[contract.type];
                // contract.handleDate = formatDateInput(contract.handleDate);
                // contract.expiredDate = formatDateInput(contract.expiredDate);
                // contract.validDate = formatDateInput(contract.validDate);
                // contract.startWork = formatDateInput(contract.startWork);
                // contract['formOfPayment'] = contract?.wage?.type;
                // contract['wageId'] = contract?.wage?.id;
                // contract['amount'] = contract?.wage?.amount;
                // contract['standardHours'] = contract.standardHours ?? undefined;
                // contract['wages'] = await api.wage.getAll({ type: contract?.wage?.type }).then(({ payload }) => payload);
                // contract['attributes'] =
                //   contract.contractAttributes && contract.contractAttributes.length > 0
                //     ? contract.contractAttributes.map((attr) => {
                //         let rv = {};
                //         rv.value = attr.value;
                //         rv.name = attr.attribute.name;
                //         rv.type = attr.attribute.type;
                //         rv.id = attr.attribute.id;
                //         return rv;
                //       })
                //     : [];
                return contract;
              })
            : [];
        // payload = await Promise.all(payload);
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'fetchContracts');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchContractTable = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.contract
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((contract) => {
                contract.text_type = type[contract.periodicPayment];
                contract.handleDate = formatDate(contract.handleDate);
                contract.startWork = formatDate(contract.startWork);
                contract.createdAt = formatDateTimeToString(contract.createdAt);
                contract.employee = contract.profileId ? contract.profile?.code + ' - ' + contract.profile?.fullname : '';
                return contract;
              })
            : [];
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'fetchContracts');
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
        handleContractExceptions(err, dispatch, 'fetchWageHistories');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchContract = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.contract
      .get(id)
      .then(async ({ payload }) => {
        payload.text_type = type[payload.type];
        payload.handleDate = formatDateInput(payload.handleDate);
        payload.expiredDate = formatDateInput(payload.expiredDate);
        payload.validDate = formatDateInput(payload.validDate);
        payload.startWork = formatDateInput(payload.startWork);
        payload.employee = payload.profileId ? payload.profile?.code + ' - ' + payload.profile?.fullname : '';
        payload['formOfPayment'] = payload?.wage?.type;
        payload['wageId'] = payload?.wage?.id;
        payload['amount'] = payload?.wage?.amount;
        payload['standardHours'] = payload.standardHours ?? undefined;
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
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'fetchContract');
      });
  };
};

export const createContract = (params, success_msg, handleResetNewContract, history) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : undefined;

  params.allowanceIds =
    params && params.allowances && params.allowances.length > 0
      ? params.allowances.map((allowance) => {
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
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleResetNewContract) {
          handleResetNewContract();
          if (payload.status === 'active') dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_CONTRACT, payload });
        } else history.push(ROUTE_PATH.CONTRACT + `/${payload.id}`);
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'createContract');
      });
  };
};

export const updateContract = (params, isActive, success_msg) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;

  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;

  params.allowanceIds =
    params.allowances && params.allowances.length > 0
      ? params.allowances.map((allowance) => {
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
        payload['formOfPayment'] = payload?.wage?.type;
        payload['wageId'] = payload?.wage?.id;
        payload['amount'] = payload?.wage?.amount;
        payload['wages'] = params?.wages;
        if (isActive) dispatch({ type: REDUX_STATE.profile.GET_ACTIVE_CONTRACT, payload });
        else dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'updateContract');
      });
  };
};

export const deleteContract = (id, success_msg, handleAfterSuccess) => {
  return (dispatch, getState) => {
    api.contract
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterSuccess) handleAfterSuccess();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'deleteContract');
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
        handleContractExceptions(err, dispatch, 'fetchBranches');
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
        handleContractExceptions(err, dispatch, 'fetchWagesByType');
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
        handleContractExceptions(err, dispatch, 'fetchHistoriesWage');
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
        handleContractExceptions(err, dispatch, 'fetchAllowances');
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
        handleContractExceptions(err, dispatch, 'createWageHistory');
      });
  };
};
export const setEmptyContracts = () => {
  return {
    type: REDUX_STATE.contract.EMPTY_LIST_CONTRACT,
    payload: [],
  };
};
export const setEmptyContract = () => {
  return {
    type: REDUX_STATE.contract.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyRenewContracts = () => {
  return {
    type: REDUX_STATE.contract.EMPTY_LIST_RENEW_CONTRACT,
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
        handleContractExceptions(err, dispatch, 'addField');
      });
  };
};
export const deleteWageHistory = (id, handleAfterSuccess, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .delete(id)
      .then(({ payload }) => {
        handleAfterSuccess();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'deleteWageHistory');
      });
  };
};
export const activeContract = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .active(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'active');

        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'activeContract');
      });
  };
};
export const inactiveContract = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .inactive(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'inactive');

        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'inactiveContract');
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
        handleContractExceptions(err, dispatch, 'countActiveContracts');
      });
  };
};

export const fetchRenewContracts = (params) => {
  return (dispatch, getState) => {
    api.contract
      .getRenew()
      .then(({ payload, total }) => {
        payload = {
          payload: payload,
          total: total,
        };
        dispatch({ type: REDUX_STATE.contract.SET_RENEW_CONTRACTS, payload });
      })
      .catch((err) => {
        handleContractExceptions(err, dispatch, 'countActiveContracts');
      });
  };
};
