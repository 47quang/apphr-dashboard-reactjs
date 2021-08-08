import { formatDateInput, formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const createHistoryWork = (data, success_msg, handleResetNewHistory) => {
  return (dispatch, getState) => {
    api.historyWork
      .post(data)
      .then(({ payload }) => {
        handleResetNewHistory();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createHistoryWork');
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
        handleExceptions(err, dispatch, getState, 'updateHistoryWork');
      });
  };
};

export const fetchHistoriesWork = (params, setLoading) => {
  return async (dispatch, getState) => {
    let departments = await api.department
      .getAll()
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                a.branchname = a.branch?.name;
                return a;
              })
            : [];
        let rValue = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENTS, payload: rValue });
        return payload;
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchHistoriesWork');
        return [];
      });
    let positions = await api.position
      .getAll()
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                a.branchName = a.branch?.name;
                a.departmentName = a.department?.name;
                return a;
              })
            : [];
        let rValue = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.position.GET_POSITIONS, payload: rValue });
        return payload;
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchHistoriesWork');
        return [];
      });
    api.historyWork
      .getAll(params)
      .then(({ payload }) => {
        payload =
          payload &&
          payload.map((h) => {
            h.from = formatDateInput(h.from);
            h.to = formatDateInput(h.to);
            h['departments'] = departments ? departments.filter((x) => x.branch.id === h.branchId) : [];
            h['positions'] = positions ? positions.filter((x) => x.department.id === h.departmentId) : [];

            return h;
          });
        // payload = await Promise.all(payload);
        dispatch({ type: REDUX_STATE.historyWork.SET_HISTORIES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchHistoriesWork');
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
        handleExceptions(err, dispatch, getState, 'deleteHistoryWork');
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
        handleExceptions(err, dispatch, getState, 'onChangeDepartment');
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
        handleExceptions(err, dispatch, getState, 'onChangePosition');
      });
  };
};

export const setEmptyHistories = () => {
  return {
    type: REDUX_STATE.historyWork.EMPTY_VALUE,
    payload: [],
  };
};

export const activeWorking = (id, handleFunction, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .active(id)
      .then(({ payload }) => {
        if (handleFunction) handleFunction();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'activeWorking');
      });
  };
};
export const inactiveWorking = (id, handleFunction, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .inactive(id)
      .then(({ payload }) => {
        if (handleFunction) handleFunction();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'inactiveWorking');
      });
  };
};
