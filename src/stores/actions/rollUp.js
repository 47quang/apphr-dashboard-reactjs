import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
import { fetchAssignment } from './assignment';

export const fetchRollUps = (params) => {
  return (dispatch, getState) => {
    api.rollUp
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.rollUp.GET_ROLLUP, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchRollUps');
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
        handleExceptions(err, dispatch, getState, 'createRollUp');
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
        handleExceptions(err, dispatch, getState, 'updateRollUp');
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
        handleExceptions(err, dispatch, getState, 'deleteRollUp');
      });
  };
};

export const setEmptyArticle = () => {
  return {
    type: REDUX_STATE.article.EMPTY_VALUE,
    payload: [],
  };
};
