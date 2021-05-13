import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
        if (setLoading) setLoading(false);
      })
      .catch((error) => {
        if (setLoading) setLoading(false);
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const setEmptyHistories = () => {
  return {
    type: REDUX_STATE.historyWork.EMPTY_VALUE,
    payload: [],
  };
};
