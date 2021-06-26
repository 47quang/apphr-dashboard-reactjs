import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleAttributeExceptions = (err, dispatch, functionName) => {
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
export const fetchAttributes = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.attribute
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
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTES, payload });
      })
      .catch((err) => {
        handleAttributeExceptions(err, dispatch, 'fetchAttributes');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAttribute = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.attribute
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
      })
      .catch((err) => {
        handleAttributeExceptions(err, dispatch, 'fetchAttribute');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createAttribute = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.attribute
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.CONTRACT_ATTRIBUTE + `/${payload.id}`);
      })
      .catch((err) => {
        handleAttributeExceptions(err, dispatch, 'createAttribute');
      });
  };
};

export const updateAttribute = (data, success_msg) => {
  return (dispatch, getState) => {
    api.attribute
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.attribute.SET_ATTRIBUTE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAttributeExceptions(err, dispatch, 'updateAttribute');
      });
  };
};

export const deleteAttribute = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.attribute
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAttributeExceptions(err, dispatch, 'deleteAttribute');
      });
  };
};

export const setEmptyAttribute = () => {
  return {
    type: REDUX_STATE.attribute.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyContractAttributes = () => {
  return {
    type: REDUX_STATE.attribute.EMPTY_LIST,
    payload: [],
  };
};
