import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchDepartments = (params) => {
  return (dispatch, getState) => {
    api.department
      .getAll()
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
      })
      .catch((err) => {
        console.log(err);
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

export const updateDepartment = (data) => {
  return (dispatch, getState) => {
    api.department
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createDepartment = (data) => {
  return (dispatch, getState) => {
    api.department
      .post(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
        window.history.back();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetDepartment = () => {
  return {
    type: REDUX_STATE.department.RESET_DEPARTMENT,
    payload: {},
  };
};
