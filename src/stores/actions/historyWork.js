import { RESPONSE_CODE } from 'src/constants/key';
import { formatDateInput, formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleHistoryWorkExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
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
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
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
        handleHistoryWorkExceptions(err, dispatch, 'fetchDepartments');
        return [];
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleHistoryWorkExceptions(err, dispatch, 'fetchPositions');
        return [];
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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

export const activeWorking = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .active(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'active');
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'activeContract');
      });
  };
};
export const inactiveWorking = (id, setFieldValue, success_msg) => {
  return (dispatch, getState) => {
    api.historyWork
      .inactive(id)
      .then(({ payload }) => {
        if (setFieldValue) setFieldValue('status', 'inactive');
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHistoryWorkExceptions(err, dispatch, 'inactiveContract');
      });
  };
};
