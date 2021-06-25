import { RESPONSE_CODE } from 'src/constants/key';
import { formatDateInput } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleDiplomaExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Unknown error occurred';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Internal server error';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = "You don't have permission to do this function";
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        localStorage.clear();
        dispatch({
          type: REDUX_STATE.user.SET_USER,
          payload: {
            username: '',
            token: '',
          },
        });
        break;
      case RESPONSE_CODE.CE_BAD_REQUEST:
        errorMessage = err.response.data.message.en;
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
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
        handleDiplomaExceptions(err, dispatch, 'createDiploma');
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
        handleDiplomaExceptions(err, dispatch, 'updateDiploma');
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
      })
      .catch((err) => {
        handleDiplomaExceptions(err, dispatch, 'fetchDiplomaByType');
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
        handleDiplomaExceptions(err, dispatch, 'deleteDiploma');
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
