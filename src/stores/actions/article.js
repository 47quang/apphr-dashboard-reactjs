import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleArticleExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchArticles = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.article
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.article.SET_ARTICLES, payload });
        if (onTotalChange) onTotalChange(total);
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
        console.log('article', payload);
        dispatch({ type: REDUX_STATE.article.SET_ARTICLE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleArticleExceptions(err, dispatch, 'updateArticle');
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
