import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchArticles = (params, setLoading) => {
  return (dispatch, getState) => {
    api.article
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.type = a.typeId ? a.type.code + ' - ' + a.type.name : '';
                a.createdAt = formatDateTimeToString(a.createdAt);
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.article.SET_ARTICLES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchArticles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchArticle = (id, setLoading) => {
  return (dispatch, getState) => {
    api.article
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchArticles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleExceptions(err, dispatch, getState, 'fetchArticles');
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
        handleExceptions(err, dispatch, getState, 'fetchArticles');
      });
  };
};

export const deleteArticle = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.article
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchArticles');
      });
  };
};

export const setEmptyArticle = () => {
  return {
    type: REDUX_STATE.article.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyArticles = () => {
  return {
    type: REDUX_STATE.article.EMPTY_LIST,
    payload: [],
  };
};
