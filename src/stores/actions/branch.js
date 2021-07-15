import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleBranchExceptions = (err, dispatch, functionName) => {
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
      case RESPONSE_CODE.CE_NOT_FOUND:
        errorMessage = err.response.data.message.en;
        break;
      default:
        errorMessage = err.response?.data?.message?.en || errorMessage;
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchBranches = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.branch
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.branch.SET_BRANCHES, payload });
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'fetchBranches');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchBranch = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.branch
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'fetchBranch');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createBranch = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.branch
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.BRANCH + `/${payload.id}`);
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'createBranch');
      });
  };
};

export const updateBranch = (data, success_msg) => {
  return (dispatch, getState) => {
    api.branch
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.branch.SET_BRANCH, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'updateBranch');
      });
  };
};

export const deleteBranch = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.branch
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'deleteBranch');
      });
  };
};

export const setEmptyBranch = () => {
  return {
    type: REDUX_STATE.branch.EMPTY_VALUE,
    payload: {},
  };
};
export const setEmptyBranches = () => {
  return {
    type: REDUX_STATE.branch.EMPTY_LIST,
    payload: {},
  };
};
export const countBranches = (params) => {
  return (dispatch, getState) => {
    api.branch
      .count(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.branch.COUNT_BRANCHES, payload });
      })
      .catch((err) => {
        handleBranchExceptions(err, dispatch, 'countBranches');
      });
  };
};
