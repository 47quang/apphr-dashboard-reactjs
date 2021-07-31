import { handleExceptions } from 'src/utils/handleExceptions';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchGeneral = (params, setLoading) => {
  return async (dispatch, getState) => {
    api.setting
      .getGeneral(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchGeneral');
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
        handleExceptions(err, dispatch, getState, 'updateGeneral');
      });
  };
};
