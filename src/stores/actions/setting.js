import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const fetchGeneral = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.setting
      .getGeneral(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.setting.SET_GENERAL, payload });
        if (setLoading) setLoading(false);
      })
      .catch((err) => {
        if (setLoading) setLoading(false);
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
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
        console.log(err);
        if (err.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (err.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};
