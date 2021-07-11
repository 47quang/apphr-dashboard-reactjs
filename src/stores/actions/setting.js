import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleSettingExceptions = (err, dispatch, functionName) => {
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
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchGeneral = (params, setLoading) => {
  if (setLoading) setLoading(true);

  return async (dispatch, getState) => {
    api.setting
      .getGeneral(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
      })
      .catch((err) => {
        handleSettingExceptions(err, dispatch, 'fetchGeneral');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const updateGeneral = (data, success_msg) => {
  return (dispatch, getState) => {
    api.setting
      .putGeneral(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleSettingExceptions(err, dispatch, 'updateGeneral');
      });
  };
};
