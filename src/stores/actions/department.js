import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleDepartmentExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
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
export const fetchDepartments = (params, setLoading) => {
  if (setLoading) setLoading(true);
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
        handleDepartmentExceptions(err, dispatch, 'fetchDepartments');
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
        handleDepartmentExceptions(err, dispatch, 'deleteDepartment');
      });
  };
};

export const fetchDepartment = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.department
      .get(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
      })
      .catch((err) => {
        handleDepartmentExceptions(err, dispatch, 'fetchDepartment');
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
        handleDepartmentExceptions(err, dispatch, 'updateDepartment');
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
        handleDepartmentExceptions(err, dispatch, 'createDepartment');
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
        handleDepartmentExceptions(err, dispatch, 'countDepartments');
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
