import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleStaticExceptions = (err, dispatch, functionName) => {
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
export const fetchStatics = (setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.static
      .getAll()
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((file) => {
                let rv = {};
                rv.file = file;
                rv.type = file.split('.')[1];
                return rv;
              })
            : [];
        dispatch({ type: REDUX_STATE.static.SET_STATICS, payload: payload });
      })
      .catch((err) => {
        handleStaticExceptions(err, dispatch, 'fetchStatics');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const deleteStatic = (id, success_msg) => {
  return (dispatch, getState) => {
    api.static
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.static.DELETE_STATIC, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleStaticExceptions(err, dispatch, 'deleteStatic');
      });
  };
};

export const setEmptyStatics = () => {
  return {
    type: REDUX_STATE.static.EMPTY_LIST,
    payload: [],
  };
};
