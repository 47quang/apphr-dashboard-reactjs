import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

export const createDiploma = (data, success_msg, handleReset) => {
  return (dispatch, getState) => {
    api.diploma
      .post(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.diploma.SET_DIPLOMA, payload });
        dispatch(fetchDiplomaByType({ profileId: data.profileId, type: data.type }));
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const updateDiploma = (data, success_msg) => {
  return (dispatch, getState) => {
    api.diploma
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.diploma.SET_DIPLOMA, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const fetchDiplomaByType = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.diploma
      .getAll(params)
      .then(({ payload }) => {
        if (params.type === 'degree') {
          payload =
            payload &&
            payload.map((dip) => {
              dip.issuedDate = formatDateInput(dip.issuedDate);
              return dip;
            });
          dispatch({ type: REDUX_STATE.diploma.SET_DEGREES, payload });
        } else {
          payload =
            payload &&
            payload.map((dip) => {
              dip.issuedDate = formatDateInput(dip.issuedDate);
              dip.expiredDate = formatDateInput(dip.expiredDate);
              return dip;
            });
          dispatch({ type: REDUX_STATE.diploma.SET_CERTIFICATES, payload });
        }
        if (setLoading) setLoading(false);
      })
      .catch((error) => {
        if (setLoading) setLoading(false);
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};

export const deleteDiploma = (id, msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.diploma
      .delete(id)
      .then(({ payload }) => {
        if (payload.type === 'certificate') {
          dispatch({ type: REDUX_STATE.diploma.DELETE_CERTIFICATE, payload });
        } else {
          dispatch({ type: REDUX_STATE.diploma.DELETE_DEGREE, payload });
        }
        handleAfterDelete();
        dispatch({
          type: REDUX_STATE.notification.SET_NOTI,
          payload: { open: true, type: 'success', message: msg },
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status >= 500)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o server' } });
        else if (error.response?.status >= 400)
          dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi o client' } });
        else dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: 'Loi' } });
      });
  };
};
export const setEmptyAcademic = () => {
  return {
    type: REDUX_STATE.diploma.EMPTY_DEGREE,
    payload: [],
  };
};
export const setEmptyCertificate = () => {
  return {
    type: REDUX_STATE.diploma.EMPTY_CERTIFICATE,
    payload: [],
  };
};
