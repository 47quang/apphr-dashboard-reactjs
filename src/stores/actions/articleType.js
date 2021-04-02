import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchTypes = () => {
  return (dispatch, getState) => {
    api.articleType
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPES, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchType = (id) => {
  return (dispatch, getState) => {
    api.articleType
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPE, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createArticleType = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.articleType
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.ARTICLE_TYPE + `/${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const updateArticleType = (data, success_msg) => {
  return (dispatch, getState) => {
    api.articleType
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const deleteArticleType = (id, success_msg) => {
  return (dispatch, getState) => {
    api.articleType
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.DELETE_TYPE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: err } });
      });
  };
};

export const setEmptyArticleType = () => {
  return {
    type: REDUX_STATE.articleType.EMPTY_VALUE,
    payload: [],
  };
};
