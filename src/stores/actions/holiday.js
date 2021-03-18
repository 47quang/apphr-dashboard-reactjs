import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

const convertTime = (payload) => {
  payload.startDate = payload.startDate.replace('Z', '');
  payload.endDate = payload.endDate.replace('Z', '');
  return payload;
};
export const fetchHolidays = () => {
  return (dispatch, getState) => {
    api.holiday
      .getAll()
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAYS, payload });
      })
      .catch((err) => {
        console.log(err);
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

export const createHoliday = (params, history) => {
  return (dispatch, getState) => {
    api.holiday
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
        history.push(`/setting/holiday/tab1.id=${payload.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateHoliday = (data) => {
  return (dispatch, getState) => {
    api.holiday
      .put(data)
      .then(({ payload }) => {
        payload = convertTime(payload);
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteHoliday = (id) => {
  return (dispatch, getState) => {
    api.holiday
      .delete(id)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.DELETE_HOLIDAY, payload });
      })
      .catch((err) => {
        console.log(err);
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
      });
  };
};
