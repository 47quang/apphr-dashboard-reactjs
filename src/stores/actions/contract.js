import { getDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchContracts = (params) => {
  return (dispatch, getState) => {
    api.contract
      .getAll(params)
      .then(async ({ payload }) => {
        payload =
          payload && payload.length > 0
            ? payload.map(async (contract) => {
                contract.handleDate = getDateInput(contract.handleDate);
                contract.expiredDate = getDateInput(contract.expiredDate);
                contract.validDate = getDateInput(contract.validDate);
                contract.startWork = getDateInput(contract.startWork);
                contract['paymentType'] = contract?.wage?.type;
                contract['wageId'] = contract?.wage?.id;
                contract['amount'] = contract?.wage?.amount;
                contract['benefits'] = await api.wageHistory.getAll({ contractId: contract.id }).then(({ payload }) => {
                  payload = payload.map(async (p) => {
                    p.startDate = getDateInput(p.startDate);
                    p.expiredDate = getDateInput(p.expiredDate);
                    p.wages = await api.wage.getAll({ type: p?.wage?.type }).then(({ payload }) => payload);
                    return p;
                  });
                  return payload;
                });
                contract['wages'] = await api.wage.getAll({ type: contract?.wage?.type }).then(({ payload }) => payload);
                contract['wages'] = await Promise.all(contract['wages']);
                contract['benefits'] = await Promise.all(contract['benefits']);
                return contract;
              })
            : [];
        payload = await Promise.all(payload);

        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
        console.log('payload', payload);
      })
      .catch((err) => {
        console.log(err);
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
      });
  };
};

export const createContract = (params, success_msg, handleResetNewContract) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;
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
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        handleResetNewContract();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const updateContract = (params, success_msg) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  //params.departmentId = params.departmentId !== null && parseInt(params.departmentId) !== 0 ? parseInt(params.departmentId) : null;
  //params.positionId = params.positionId !== null && parseInt(params.positionId) !== 0 ? parseInt(params.positionId) : null;

  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;
  console.log('params contract', params);

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
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
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
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};
export const setEmptyContract = () => {
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
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};
