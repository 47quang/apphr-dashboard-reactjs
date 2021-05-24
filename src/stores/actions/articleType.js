import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleArticleTypeExceptions = (err, dispatch, functionName) => {
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
export const fetchTypes = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.articleType
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPES, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleArticleTypeExceptions(err, dispatch, 'fetchTypes');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchType = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.articleType
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.articleType.SET_TYPE, payload });
      })
      .catch((err) => {
        handleArticleTypeExceptions(err, dispatch, 'fetchType');
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
        handleArticleTypeExceptions(err, dispatch, 'createArticleType');
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
        handleArticleTypeExceptions(err, dispatch, 'updateArticleType');
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
        handleArticleTypeExceptions(err, dispatch, 'deleteArticleType');
      });
  };
};

export const setEmptyArticleType = () => {
  return {
    type: REDUX_STATE.articleType.EMPTY_VALUE,
    payload: [],
  };
};
