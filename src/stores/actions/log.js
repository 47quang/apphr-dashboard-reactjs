import { RESPONSE_CODE } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
const handleLogExceptions = (err, dispatch, functionName) => {
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
export const fetchLogs = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.log
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.log.SET_LOGS, payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleLogExceptions(err, dispatch, 'fetchLogs');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const setEmptyLogs = () => {
  return {
    type: REDUX_STATE.log.EMPTY_LIST,
    payload: [],
  };
};
