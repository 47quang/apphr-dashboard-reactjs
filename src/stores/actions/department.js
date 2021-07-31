import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchDepartments = (params, setLoading) => {
  return (dispatch, getState) => {
    api.department
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                a.branchname = a.branch?.name;
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchDepartments');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const deleteDepartment = (params, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.department
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteDepartment');
      });
  };
};

export const fetchDepartment = (params, setLoading) => {
  return (dispatch, getState) => {
    api.department
      .get(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchDepartment');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const updateDepartment = (data, success_msg) => {
  return (dispatch, getState) => {
    api.department
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'updateDepartment');
      });
  };
};

export const createDepartment = (data, history, success_msg) => {
  return (dispatch, getState) => {
    api.department
      .post(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });

        history.push(ROUTE_PATH.DEPARTMENT + `/${payload.id}`);
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createDepartment');
      });
  };
};

export const resetDepartment = () => {
  return {
    type: REDUX_STATE.department.RESET_DEPARTMENT,
    payload: {},
  };
};

export const countDepartments = (params) => {
  return (dispatch, getState) => {
    api.department
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.department.COUNT_DEPARTMENTS, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'countDepartments');
      });
  };
};
export const setEmptyDepartment = () => {
  return {
    type: REDUX_STATE.department.EMPTY_VALUE,
    payload: {},
  };
};
export const setEmptyDepartments = () => {
  return {
    type: REDUX_STATE.department.EMPTY_LIST,
    payload: {},
  };
};
