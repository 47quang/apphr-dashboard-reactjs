import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const login = (params, history) => {
  return (dispatch, getState) => {
    api.user
      .login(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.user.SET_USER, payload });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
