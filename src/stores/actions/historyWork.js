import { getDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const createHistoryWork = (data, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .post(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.historyWork.SET_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: error } });
      });
  };
};

export const updateHistoryWork = (data, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.historyWork.SET_HISTORY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: error } });
      });
  };
};

export const fetchHistoriesWork = (params) => {
  return (dispatch, getState) => {
    api.historyWork
      .getAll(params)
      .then(async ({ payload }) => {
        payload =
          payload &&
          payload.map(async (h) => {
            h.from = getDateInput(h.from);
            h.to = getDateInput(h.to);
            h['departments'] = await api.department.getAll({ branchId: h.branchId }).then(({ payload }) => payload);
            h['positions'] = await api.position.getAll({ departmentId: h.departmentId }).then(({ payload }) => payload);
            h['branches'] = await api.branch.getAll().then(({ payload }) => payload);
            return h;
          });
        payload = await Promise.all(payload).then((values) => values);
        console.log('h', payload);
        dispatch({ type: REDUX_STATE.historyWork.SET_HISTORIES, payload });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteHistoryWork = (id, msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.historyWork.DELETE_HISTORY, payload });
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'success', message: msg },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'error', message: error },
        });
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
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'error', message: error },
        });
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
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'error', message: error },
        });
      });
  };
};
