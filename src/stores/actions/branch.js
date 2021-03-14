import { api } from "../apis/index";
import { REDUX_STATE } from "../states";

export const fetchBranches = (params) => {
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

export const fetchBranch = (id) => {
  return (dispatch, getState) => {
    api.branch
      .getBranch(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createBranch = (params) => {
  return (dispatch, getState) => {
    api.branch
      .postBranch(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBranch = (data, id) => {
  return (dispatch, getState) => {
    api.branch
      .putBranch(data, id)
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
      .deleteBranch(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.DELETE_BRANCH, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDeleteDBranchId = (id) => {
  return {
    type: REDUX_STATE.branch.SET_DELETED_BRANCH_ID,
    payload: id,
  };
};

export const setEmptyDBranch = () => {
  return {
    type: REDUX_STATE.branch.EMPTY_VALUE,
    payload: [],
  };
};
