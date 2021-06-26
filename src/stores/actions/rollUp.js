import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
import { fetchAssignment } from './assignment';

const handleRollUpExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
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
export const fetchRollUps = (params) => {
  return (dispatch, getState) => {
    api.rollUp
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.rollUp.GET_ROLLUP, payload });
      })
      .catch((err) => {
        handleRollUpExceptions(err, dispatch, 'fetchRollUps');
      });
  };
};

export const createRollUp = (params, setIsReload, success_msg) => {
  return (dispatch, getState) => {
    api.rollUp
      .post(params)
      .then(({ payload }) => {
        dispatch(fetchAssignment(params.assignmentId));
        if (setIsReload) setIsReload(true);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRollUpExceptions(err, dispatch, 'createRollUp');
      });
  };
};

export const updateRollUp = (data, assignmentId, setIsReload, success_msg) => {
  return (dispatch, getState) => {
    api.rollUp
      .put(data)
      .then(({ payload }) => {
        dispatch(fetchAssignment(assignmentId));
        if (setIsReload) setIsReload(true);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRollUpExceptions(err, dispatch, 'updateRollUp');
      });
  };
};

export const deleteRollUp = (id, assignmentId, success_msg, setIsReload) => {
  return (dispatch, getState) => {
    api.rollUp
      .delete(id)
      .then(({ payload }) => {
        dispatch(fetchAssignment(assignmentId));
        if (setIsReload) setIsReload(true);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleRollUpExceptions(err, dispatch, 'deleteRollUp');
      });
  };
};

export const setEmptyArticle = () => {
  return {
    type: REDUX_STATE.article.EMPTY_VALUE,
    payload: [],
  };
};
