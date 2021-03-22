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
        history.push(ROUTE_PATH.ROOT);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logout = (history) => {
  return (dispatch, getState) => {
    const payload = {
      user: '',
      token: '',
    };
    dispatch({
      type: REDUX_STATE.user.SET_USER,
      payload,
    });
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', payload.user);
    history.push(ROUTE_PATH.ROOT);
  };
};
