import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleDepartmentExceptions = (err, dispatch, functionName) => {
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
export const fetchDepartments = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.department
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENTS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleDepartmentExceptions(err, dispatch, 'fetchDepartments');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const deleteDepartment = (params, success_msg) => {
  return (dispatch, getState) => {
    api.department
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.DELETE_DEPARTMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
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
