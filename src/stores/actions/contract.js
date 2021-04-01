import { ROUTE_PATH } from 'src/constants/key';
import { getDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchContracts = (profileId) => {
  return (dispatch, getState) => {
    api.contract
      .getAll(profileId)
      .then(({ payload }) => {
        payload =
          payload &&
          payload.length &&
          payload.map((contract) => {
            contract.handleDate = getDateInput(contract.handleDate);
            contract.expiredDate = getDateInput(contract.expiredDate);
            contract.validDate = getDateInput(contract.validDate);
            contract.startWork = getDateInput(contract.startWork);
            contract['paymentType'] = contract?.wage?.type;
            contract['wageId'] = contract?.wage?.id;
            contract['amount'] = contract?.wage?.amount;
            return contract;
          });
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACTS, payload });
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

export const createContract = (params, history, success_msg) => {
  params.handleDate = params.handleDate === '' ? null : params.handleDate;
  params.expiredDate = params.expiredDate === '' ? null : params.expiredDate;
  params.startWork = params.startWork === '' ? null : params.startWork;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;
  params.branchId = params.branchId !== null && parseInt(params.branchId) !== 0 ? parseInt(params.branchId) : null;
  params.departmentId = params.departmentId !== null && parseInt(params.departmentId) !== 0 ? parseInt(params.departmentId) : null;
  params.positionId = params.positionId !== null && parseInt(params.positionId) !== 0 ? parseInt(params.positionId) : null;

  params.probTime = params.probTime !== null && parseInt(params.probTime) !== 0 ? parseInt(params.probTime) : null;
  params.profileId = params.profileId !== null && parseInt(params.profileId) !== 0 ? parseInt(params.profileId) : null;
  params.wageId = params.wageId !== null && parseInt(params.wageId) !== 0 ? parseInt(params.wageId) : null;
  params.allowanceIds =
    params.allowance &&
    params.allowance.length > 0 &&
    params.allowance.map((allowance) => {
      if (allowance.name !== 0) return allowance.name;
    });
  console.log('params', params);
  return (dispatch, getState) => {
    api.contract
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.contract.SET_CONTRACT, payload });
        history.push(ROUTE_PATH.PROFILE + `/${payload.id}`);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteContract = (id, success_msg) => {
  return (dispatch, getState) => {
    api.contract
      .delete(id)
      .then(({ payload }) => {
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
