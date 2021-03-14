import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchBranches = () => {
  return (dispatch, getState) => {
    api.branch
      .getBranches()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCHES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createBranch = (data) => {
  return (dispatch, getState) => {
    api.branch
      .postBranch(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
