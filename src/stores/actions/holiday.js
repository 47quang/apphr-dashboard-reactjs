import { api } from '../apis/index';
import { REDUX_STATE } from '../states';

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
        payload.startDate = payload.startDate.replace('Z', '');
        payload.endDate = payload.endDate.replace('Z', '');
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createHoliday = (params) => {
  console.log(params);
  return (dispatch, getState) => {
    api.holiday
      .post(params)
      .then(({ payload }) => {
        dispatch({ type: REDUX_STATE.holiday.SET_HOLIDAY, payload });
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
