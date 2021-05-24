import { RESPONSE_CODE, ROUTE_PATH } from 'src/constants/key';
import { api } from '../apis/index';
import { REDUX_STATE } from '../states';
//TODO
const handleWageExceptions = (err, dispatch, functionName) => {
  console.log(functionName + ' errors', err.response);
  let errorMessage = 'Đã có lỗi bất thường xảy ra';
  if (err?.response?.status) {
    switch (err.response.status) {
      case RESPONSE_CODE.SE_BAD_GATEWAY:
        errorMessage = 'Server Bad Gateway';
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
export const fetchWages = (params, onTotalChange, setLoading) => {
  const paymentType = {
    by_hour: 'Chi trả theo giờ',
    by_month: 'Chi trả theo tháng',
  };
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .getAll(params)
      .then(({ payload, total }) => {
        payload =
          payload && payload.length > 0
            ? payload.map((wage) => {
                wage.type = paymentType[wage.type];
                return wage;
              })
            : [];
        dispatch({ type: REDUX_STATE.wage.SET_WAGES, payload: payload });
        if (onTotalChange) onTotalChange(total);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWages');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const fetchWage = (id, setLoading) => {
  if (setLoading) setLoading(true);
  return (dispatch, getState) => {
    api.wage
      .get(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'fetchWage');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };
};

export const createWage = (params, history, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
        history.push(ROUTE_PATH.WAGE + `/${payload.id}`);
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'createWage');
      });
  };
};

export const updateWage = (data, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .put(data)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.SET_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'updateWage');
      });
  };
};

export const deleteWage = (id, success_msg) => {
  return (dispatch, getState) => {
    api.wage
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.wage.DELETE_WAGE, payload });
        dispatch({ type: REDUX_STATE.notification.SET_NOTI, payload: { open: true, type: 'success', message: success_msg } });
      })
      .catch((err) => {
        handleWageExceptions(err, dispatch, 'deleteWage');
      });
  };
};

export const setEmptyWage = () => {
  return {
    type: REDUX_STATE.wage.EMPTY_VALUE,
    payload: [],
  };
};
