import { ROUTE_PATH } from 'src/constants/key';
import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
        handleExceptions(err, dispatch, getState, 'login');
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
