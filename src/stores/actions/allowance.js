import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { formatDateTimeToString } from 'src/utils/datetimeUtils';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const handleAllowanceExceptions = (err, dispatch, functionName) => {
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
export const fetchAllowances = (params, setLoading) => {
  return (dispatch, getState) => {
    api.allowance
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((allowance) => {
                allowance.createdAt = formatDateTimeToString(allowance.createdAt);
                return allowance;
              })
            : [];
        payload = { payload: payload, total: total };
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCES, payload });
      })
      .catch((err) => {
        handleAllowanceExceptions(err, dispatch, 'fetchAllowances');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchAllowance = (id, setLoading) => {
  return (dispatch, getState) => {
    api.allowance
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
      })
      .catch((err) => {
        handleAllowanceExceptions(err, dispatch, 'fetchAllowance');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createAllowance = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.ALLOWANCE + `/${payload.id}`);
      })
      .catch((err) => {
        handleAllowanceExceptions(err, dispatch, 'createAllowance');
      });
  };
};

export const updateAllowance = (data, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.allowance.SET_ALLOWANCE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAllowanceExceptions(err, dispatch, 'updateAllowance');
      });
  };
};

export const deleteAllowance = (id, success_msg, handleAfterDelete) => {
  return (dispatch, getState) => {
    api.allowance
      .delete(id)
      .then(({ payload }) => {
        if (handleAfterDelete) handleAfterDelete();
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleAllowanceExceptions(err, dispatch, 'deleteAllowance');
      });
  };
};

export const setEmptyAllowance = () => {
  return {
    type: REDUX_STATE.allowance.EMPTY_VALUE,
    payload: [],
  };
};
export const setEmptyAllowances = () => {
  return {
    type: REDUX_STATE.allowance.EMPTY_LIST,
    payload: [],
  };
};
