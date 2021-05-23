import { RESPONSE_CODE } from 'src/constants/key';
import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleHistoryWorkExceptions = (err, dispatch, functionName) => {
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
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const createHistoryWork = (data, success_msg, handleResetNewHistory) => {
  return (dispatch, getState) => {
    api.historyWork
      .post(data)
      .then(({ payload }) => {
        payload.from = formatDateInput(payload.from);
        payload.to = formatDateInput(payload.to);
        dispatch({ type: REDUX_STATE.historyWork.CREATE_HISTORY, payload });
        handleResetNewHistory();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'createHistoryWork');
      });
  };
};

export const updateHistoryWork = (data, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .put(data)
      .then(({ payload }) => {
        payload.from = formatDateInput(payload.from);
        payload.to = formatDateInput(payload.to);
        payload.branches = data.branches;
        payload.departments = data.departments;
        payload.positions = data.positions;
        dispatch({ type: REDUX_STATE.historyWork.UPDATE_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'updateHistoryWork');
      });
  };
};

export const fetchHistoriesWork = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.historyWork
      .getAll(params)
      .then(async ({ payload }) => {
        payload =
          payload &&
          payload.map(async (h) => {
            h.from = formatDateInput(h.from);
            h.to = formatDateInput(h.to);
            h['departments'] = await api.department.getAll({ branchId: h.branchId }).then(({ payload }) => payload);
            h['positions'] = await api.position.getAll({ departmentId: h.departmentId }).then(({ payload }) => payload);
            h['branches'] = await api.branch.getAll().then(({ payload }) => payload);
            return h;
          });
        payload = await Promise.all(payload);
        dispatch({ type: REDUX_STATE.historyWork.SET_HISTORIES, payload });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'fetchHistoriesWork');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const deleteHistoryWork = (id, msg, handleAfterSuccess) => {
  return (dispatch, getState) => {
    api.historyWork
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.historyWork.DELETE_HISTORY, payload });
        handleAfterSuccess();
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'success', message: msg },
        });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'deleteHistoryWork');
      });
  };
};
export const onChangeDepartment = (params, index) => {
  return (dispatch, getState) => {
    api.department
      .getAll(params)
      .then(({ payload }) => {
        payload['index'] = index;
        dispatch({ type: REDUX_STATE.historyWork.GET_DEPARTMENTS, payload });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'onChangeDepartment');
      });
  };
};
export const onChangePosition = (params, index) => {
  return (dispatch, getState) => {
    api.position
      .getAll(params)
      .then(({ payload }) => {
        payload['index'] = index;
        dispatch({ type: REDUX_STATE.historyWork.GET_POSITIONS, payload });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'onChangePosition');
      });
  };
};

export const setEmptyHistories = () => {
  return {
    type: REDUX_STATE.historyWork.EMPTY_VALUE,
    payload: [],
  };
};
