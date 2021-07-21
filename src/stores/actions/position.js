import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handlePositionExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
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
export const fetchPositions = (params, setLoading) => {
  return (dispatch, getState) => {
    api.position
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                a.branchName = a.branch?.name;
                a.departmentName = a.department?.name;
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.position.GET_POSITIONS, payload });
      })
      .catch((err) => {
        handlePositionExceptions(err, dispatch, 'fetchPositions');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchPosition = (id, setLoading) => {
  return (dispatch, getState) => {
    api.position
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
      })
      .catch((err) => {
        handlePositionExceptions(err, dispatch, 'fetchPosition');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createPosition = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.position
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.POSITION + `/${payload.id}`);
      })
      .catch((err) => {
        handlePositionExceptions(err, dispatch, 'createPosition');
      });
  };
};

export const updatePosition = (data, id, success_msg) => {
  return (dispatch, getState) => {
    api.position
      .put(data, id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITION, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handlePositionExceptions(err, dispatch, 'updatePosition');
      });
  };
};

export const deletePosition = (params, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.position
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.DELETE_POSITION, payload });
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handlePositionExceptions(err, dispatch, 'deletePosition');
      });
  };
};

export const setEmptyPosition = () => {
  return {
    type: REDUX_STATE.position.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyPositions = () => {
  return {
    type: REDUX_STATE.position.EMPTY_LIST,
    payload: [],
  };
};
