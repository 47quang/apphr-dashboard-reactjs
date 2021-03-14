import { api } from "../apis";
import { REDUX_STATE } from "../states";

export const fetchShifts = (params) => {
  return (dispatch, getState) => {
    api.shift.getShiftList(params).then(({ payload }) => {
      dispatch({ type: REDUX_STATE.shift.GET_SHIFTS, payload: payload });
    });
  };
};
export const fetchShift = (id) => {
  return (dispatch, getState) => {
    api.shift.getShift(id).then(({ payload }) => {
      dispatch({ type: REDUX_STATE.shift.GET_SHIFT, payload: payload });
    });
  };
};
export const createNewShift = (bodyParams) => {
  return (dispatch, getState) => {
    api.shift
      .postShift(bodyParams)
      .then(({ payload }) => {
        dispatch({
          type: REDUX_STATE.shift.GET_SHIFT,
          payload: payload,
        });
      })
      .catch((err) => {
        console.log(REDUX_STATE.shift.GET_SHIFT, err);
      });
  };
};

export const updateShift = (bodyParams) => {
  return (dispatch, getState) => {
    api.shift
      .putShift(bodyParams)
      .then(({ payload }) => {
        dispatch({
          type: REDUX_STATE.shift.SET_SHIFT,
          payload: payload,
        });
      })
      .catch((err) => {
        console.log(REDUX_STATE.shift.GET_SHIFT, err);
      });
  };
};
