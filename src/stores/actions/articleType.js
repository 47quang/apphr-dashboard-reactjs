import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleArticleTypeExceptions = (err, dispatch, functionName) => {
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
        handleArticleTypeExceptions(err, dispatch, 'fetchTypes');
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

export const deleteArticleType = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.articleType
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
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
export const setEmptyArticleTypes = () => {
  return {
    type: REDUX_STATE.articleType.EMPTY_LIST,
    payload: [],
  };
};
