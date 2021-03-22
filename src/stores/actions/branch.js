import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchBranches = () => {
  return (dispatch, getState) => {
    api.branch
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCHES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchBranch = (id) => {
  return (dispatch, getState) => {
    api.branch
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createBranch = (params, history) => {
  return (dispatch, getState) => {
    api.branch
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
        history.push(ROUTE_PATH.BRANCH + `/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBranch = (data) => {
  return (dispatch, getState) => {
    api.branch
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteBranch = (id) => {
  return (dispatch, getState) => {
    api.branch
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.DELETE_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setEmptyBranch = () => {
  return {
    type: REDUX_STATE.branch.EMPTY_VALUE,
    payload: [],
  };
};
