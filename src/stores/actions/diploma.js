import { formatDateInput } from 'src/utils/datetimeUtils';
import { handleExceptions } from 'src/utils/handleExceptions';
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
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'createDiploma');
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
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'updateDiploma');
      });
  };
};

export const fetchDiplomaByType = (params, setLoading) => {
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
      })
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'fetchDiplomaByType');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
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
      .catch((err) => {
        handleExceptions(err, dispatch, getState, 'deleteDiploma');
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
