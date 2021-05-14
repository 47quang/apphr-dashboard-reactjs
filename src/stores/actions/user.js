import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
