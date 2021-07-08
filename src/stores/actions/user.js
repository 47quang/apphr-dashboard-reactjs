import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleLoginExceptions = (err, dispatch, functionName) => {
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
export const login = (params, history) => {
  return (dispatch, getState) => {
    api.user
      .login(params)
      .then(({ payload }) => {
        let host = window.location.host;
        let parts = host.split('.');
        let subdomain = parts.length >= 3 ? parts[0] : 'dev';
        api.setting.getIdByCode(subdomain).then(({ payload }) => localStorage.setItem('tenantId', payload.id));
        dispatch({ type: REDUX_STATE.user.SET_USER, payload });
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', payload.user.username);
        localStorage.setItem('roleId', payload.user.roleId);
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
    localStorage.clear();
    history.push(ROUTE_PATH.LOGIN);
  };
};
