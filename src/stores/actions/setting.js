import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchGeneral = (params) => {
  return (dispatch, getState) => {
    api.setting
      .getGeneral(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateGeneral = (payload) => {
  return (dispatch, getState) => {
    api.setting
      .putGeneral(payload)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
