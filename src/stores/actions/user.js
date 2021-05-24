import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleLoginExceptions = (err, dispatch, functionName) => {
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
export const login = (params, history) => {
  return (dispatch, getState) => {
    api.user
      .login(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.user.SET_USER, payload });
        localStorage.setItem('token', payload.token);
        localStorage.setItem('permissionIds', JSON.stringify(payload.user.role.permissionIds));
        history.push(ROUTE_PATH.ROOT);
      })
      .catch((err) => {
        handleLoginExceptions(err, dispatch, 'login');
      });
  };
};

export const logout = (history) => {
  return (dispatch, getState) => {
    const payload = {
      token: '',
      permissionIds: '',
    };
    dispatch({
      type: REDUX_STATE.user.SET_USER,
      payload,
    });
    localStorage.setItem('token', payload.token);
    localStorage.setItem('permissionIds', payload.permissionIds);
    history.push(ROUTE_PATH.LOGIN);
  };
};
