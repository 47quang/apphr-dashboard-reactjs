import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handlePositionExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
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
export const fetchPositions = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.position
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.position.GET_POSITIONS, payload });
        if (onTotalChange) onTotalChange(total);
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
  if (setLoading) setLoading(true);
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

export const deletePosition = (params, success_msg) => {
  return (dispatch, getState) => {
    api.position
      .delete(params.id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.position.DELETE_POSITION, payload });
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
