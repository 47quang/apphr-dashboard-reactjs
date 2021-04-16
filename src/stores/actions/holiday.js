import { ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const convertTime = (payload) => {
  payload.startDate = payload.startDate.replace('Z', '');
  payload.endDate = payload.endDate.replace('Z', '');
  return payload;
};
export const fetchHolidays = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.holiday
      .getAll(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAYS, payload });
        if (onTotalChange) onTotalChange(total);
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

export const fetchHoliday = (id) => {
  return (dispatch, getState) => {
    api.holiday
      .get(id)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createHoliday = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });

        history.push(ROUTE_PATH.HOLIDAY + `/tab1.id=${payload.id}`);
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

export const updateHoliday = (data, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .put(data)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
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

export const deleteHoliday = (id, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.DELETE_HOLIDAY, payload });
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

export const setEmptyHoliday = () => {
  return {
    type: REDUX_STATE.holiday.EMPTY_VALUE,
    payload: [],
  };
};

export const fetchAllRequest = () => {
  return (dispatch, getState) => {
    api.holiday
      .getAllRequest()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.GET_REQUESTS, payload });
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
