import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchRollup = (params) => {
  return (dispatch, getState) => {
    api.rollUp
      .getAll(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.rollUp.GET_ROLLUP, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchArticle = (id) => {
  return (dispatch, getState) => {
    api.article
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createArticle = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.article
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.NOTIFICATION + `/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const updateArticle = (data, success_msg) => {
  return (dispatch, getState) => {
    api.article
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteArticle = (id, success_msg) => {
  return (dispatch, getState) => {
    api.article
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.DELETE_ARTICLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const setEmptyArticle = () => {
  return {
    type: REDUX_STATE.article.EMPTY_VALUE,
    payload: [],
  };
};
