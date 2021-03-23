import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchDepartments = (params) => {
  return (dispatch, getState) => {
    api.department
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENTS, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteDepartment = (params) => {
  return (dispatch, getState) => {
    api.department
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.DELETE_DEPARTMENT, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: 'Xóa thành công' } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const fetchDepartment = (params) => {
  return (dispatch, getState) => {
    api.department
      .get(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
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
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const resetDepartment = () => {
  return {
    type: REDUX_STATE.department.RESET_DEPARTMENT,
    payload: {},
  };
};
