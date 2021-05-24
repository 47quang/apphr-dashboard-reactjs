import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleAllowanceExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server bad gateway';
        break;
      case RESPONSE_CODE.SE_INTERNAL_SERVER_ERROR:
        errorMessage = 'Đã xảy ra lỗi ở server';
        break;
      case RESPONSE_CODE.CE_FORBIDDEN:
        errorMessage = 'Bạn không thể thực hiện chức năng này';
        break;
      case RESPONSE_CODE.CE_UNAUTHORIZED:
        errorMessage = 'Token bị quá hạn';
        break;
      default:
        break;
    }
  }
  dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'error', message: errorMessage } });
};
export const fetchAllowances = (params, onTotalChange, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.allowance
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((allowance) => {
                if (allowance.type === 'no_tax') allowance.type = 'Không tính thuế';
                else if (allowance.type === 'tax') allowance.type = 'Tính thuế';
                else allowance.type = 'Có hạn mức';
                return allowance;
              })
            : [];

        if (onTotalChange) onTotalChange(total);
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
  if (setLoading) setLoading(true);
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

export const deleteAllowance = (id, decreaseTotal, success_msg) => {
  return (dispatch, getState) => {
    api.allowance
      .delete(id)
      .then(({ payload }) => {
        if (decreaseTotal) decreaseTotal(-1);
        dispatch({ type: REDUX_STATE.allowance.DELETE_ALLOWANCE, payload });
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
