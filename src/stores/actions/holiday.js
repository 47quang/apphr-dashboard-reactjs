import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleHolidayExceptions = (err, dispatch, functionName) => {
  console.debug(functionName + ' errors', err.response);
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
      case RESPONSE_CODE.CE_NOT_FOUND:
        errorMessage = err.response.data.message.en;
        break;
      default:
        errorMessage = err.response?.data?.message?.en || errorMessage;
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchHolidays = (params, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.holiday
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((a) => {
                a.createdAt = formatDateTimeToString(a.createdAt);
                return a;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAYS, payload });
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'fetchHolidays');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchHoliday = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.holiday
      .get(id)
      .then(({ payload }) => {
        payload.startDate = payload.startDate.replace('T00:00:00.000Z', '');
        payload.endDate = payload.endDate.replace('T23:59:59.000Z', '');
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'fetchHoliday');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createHoliday = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .post(params)
      .then(({ payload }) => {
        payload.startDate = payload.startDate.replace('T00:00:00.000Z', '');
        payload.endDate = payload.endDate.replace('T23:59:59.000Z', '');
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.HOLIDAY + `/tab1.id=${payload.id}`);
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'createHoliday');
      });
  };
};

export const updateHoliday = (data, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .put(data)
      .then(({ payload }) => {
        payload.startDate = payload.startDate.replace('T00:00:00.000Z', '');
        payload.endDate = payload.endDate.replace('T23:59:59.000Z', '');
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'updateHoliday');
      });
  };
};

export const deleteHoliday = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.holiday
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        if (handleAfterDelete) handleAfterDelete();
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'deleteHoliday');
      });
  };
};

export const setEmptyHoliday = () => {
  return {
    type: REDUX_STATE.holiday.EMPTY_VALUE,
    payload: [],
  };
};

export const setEmptyHolidays = () => {
  return {
    type: REDUX_STATE.holiday.EMPTY_LIST,
    payload: [],
  };
};

export const fetchAllRequest = (params, onTotalChange) => {
  return (dispatch, getState) => {
    api.holiday
      .getAllRequest(params)
      .then(({ payload, total }) => {
        dispatch({ type: REDUX_STATE.holiday.GET_REQUESTS, payload });
        onTotalChange(total);
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'fetchAllRequest');
      });
  };
};

export const fetchPolicy = () => {
  return (dispatch, getState) => {
    api.holiday
      .getPolicy()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_POLICY, payload });
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'fetchPolicy');
      });
  };
};

export const updatePolicy = (params, success_msg) => {
  return (dispatch, getState) => {
    api.holiday
      .setPolicy(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_POLICY, payload: payload.value });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleHolidayExceptions(err, dispatch, 'updatePolicy');
      });
  };
};
