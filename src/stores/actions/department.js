import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchDepartments = (params) => {
  return (dispatch, getState) => {
    api.department
      .getDepartments()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENTS, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createDepartment = (payload) => {
  return (dispatch, getState) => {
    api.department
      .postDepartment(payload)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.department.SET_DEPARTMENT, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
