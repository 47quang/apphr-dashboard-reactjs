import { ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchTypes = (params, setLoading) => {
  return (dispatch, getState) => {
    api.articleType
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
        dispatch({ type: REDUX_STATE.articleType.SET_TYPES, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchTypes');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchType = (id, setLoading) => {
  return (dispatch, getState) => {
    api.articleType
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPE, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchType');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
        handleExceptions(err, dispatch, getState, 'createArticleType');
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
        handleExceptions(err, dispatch, getState, 'updateArticleType');
      });
  };
};

export const deleteArticleType = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.articleType
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteArticleType');
      });
  };
};

export const setEmptyArticleType = () => {
  return {
    type: REDUX_STATE.articleType.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyArticleTypes = () => {
  return {
    type: REDUX_STATE.articleType.EMPTY_LIST,
    payload: [],
  };
};
