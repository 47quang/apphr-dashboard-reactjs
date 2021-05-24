import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDate, formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleWageExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchWageHistories = (params, onTotalChange, setLoading, t) => {
  const paymentType = {
    by_hour: 'Chi trả theo giờ',
    by_month: 'Chi trả theo tháng',
  };
  const status = {
    active: t('label.active'),
    inactive: t('label.inactive'),
  };
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wageHistory
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((wage) => {
                wage.contractName = wage?.contract?.code + ' - ' + wage?.contract?.fullname;
                wage.employee = wage.profile.code + ' - ' + wage.profile.fullname;
                wage.type = paymentType[wage.type];
                wage.status = status[wage.status];
                wage.startDate = formatDate(wage.startDate);
                return wage;
              })
            : [];
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORIES, payload: payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWageHistories');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWageHistory = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wageHistory
      .get(id)
      .then(async ({ payload }) => {
        payload.wageId = payload.wageId ?? undefined;
        payload.type = payload?.wage?.type;
        payload.code = payload.code ?? undefined;
        payload.wages = payload.wageId ? await api.wage.getAll({ type: payload.type }).then(({ payload }) => payload) : [];
        payload.startDate = formatDateInput(payload.startDate);
        payload.expiredDate = payload.expiredDate ? formatDateInput(payload.expiredDate) : '';
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWageHistory');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createWageHistory = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.NAV_BENEFIT + `/${payload.id}`);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'createWageHistory');
      });
  };
};

export const updateWageHistory = (data, success_msg) => {
  data.profileId = data.profileId ? parseInt(data.profileId) : data.profileId;
  data.contractId = data.contractId ? parseInt(data.contractId) : data.contractId;
  data.wageId = data.wageId ? parseInt(data.wageId) : data.wageId;
  if (!data.expiredDate) delete data.expiredDate;
  // delete data.wage;
  // delete data.wages;
  data.allowanceIds = data.allowances && data.allowances.length > 0 ? data.allowances.map((a) => parseInt(a.id)) : [];
  return (dispatch, getState) => {
    api.wageHistory
      .put(data)
      .then(({ payload }) => {
        payload.type = data?.wage?.type;
        payload.wageId = data.wageId;
        payload.wages = data.wages;
        payload.startDate = formatDateInput(payload.startDate);
        payload.code = payload.code ?? undefined;
        payload.expiredDate = payload.expiredDate ? formatDateInput(payload.expiredDate) : '';
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.wageHistory.SET_WAGE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'updateWageHistory');
      });
  };
};

export const deleteWageHistory = (id, handleAfterDelete, success_msg) => {
  return (dispatch, getState) => {
    api.wageHistory
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'deleteWageHistory');
      });
  };
};

export const setEmptyWageHistories = () => {
  return {
    type: REDUX_STATE.wageHistory.EMPTY_LIST,
    payload: [],
  };
};

export const setEmptyWageHistory = () => {
  return {
    type: REDUX_STATE.wageHistory.EMPTY_VALUE,
    payload: [],
  };
};
