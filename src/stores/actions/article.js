import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleArticleExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
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
export const fetchArticles = (params, setLoading) => {
  if (setLoading) setLoading(true);
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
        handleArticleExceptions(err, dispatch, 'fetchArticles');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchArticle = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.article
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
      })
      .catch((err) => {
        handleArticleExceptions(err, dispatch, 'fetchArticle');
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
        handleArticleExceptions(err, dispatch, 'createArticle');
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
        handleArticleExceptions(err, dispatch, 'updateArticle');
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
        handleArticleExceptions(err, dispatch, 'delete Article');
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
